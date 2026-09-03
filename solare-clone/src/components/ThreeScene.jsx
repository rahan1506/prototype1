import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function makeGlowTexture() {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 256
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, 'rgba(255,214,160,1)')
  g.addColorStop(0.25, 'rgba(255,170,90,0.7)')
  g.addColorStop(1, 'rgba(255,150,70,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  return new THREE.CanvasTexture(c)
}

/**
 * design_reference 3D-01 / WOW-02 / WOW-04:
 * an interactive solar-arch scene — glowing sun, monument arch,
 * floating embers, mouse parallax tilt and idle breathing.
 */
export default function ThreeScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xf4ecdc, 14, 30)

    const camera = new THREE.PerspectiveCamera(46, mount.clientWidth / mount.clientHeight, 0.1, 60)
    camera.position.set(0, 1.6, 11)
    camera.lookAt(0, 1.4, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)
    renderer.domElement.style.cssText = 'position:absolute;inset:0;display:block;'

    const setSize = () => {
      const w = mount.clientWidth || 1
      const h = mount.clientHeight || 1
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    setSize()
    window.addEventListener('resize', setSize)

    /* ---- sun + glow ---- */
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: makeGlowTexture(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
    )
    glow.scale.set(13, 13, 1)
    glow.position.set(0, 2.1, -1.5)

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(1.9, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0xffc07a }),
    )
    sun.position.set(0, 2.1, -1.5)

    /* ---- stone arch ---- */
    const stone = new THREE.MeshStandardMaterial({ color: 0xc4a882, roughness: 0.92, metalness: 0.05 })
    const arch = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.55, 22, 48, Math.PI), stone)
    arch.position.set(0, -2.6, 0)

    const pillarGeo = new THREE.CylinderGeometry(0.6, 0.75, 4.8, 24)
    const pL = new THREE.Mesh(pillarGeo, stone)
    pL.position.set(-3.2, -5.0, 0)
    const pR = new THREE.Mesh(pillarGeo, stone)
    pR.position.set(3.2, -5.0, 0)

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(9, 48),
      new THREE.MeshStandardMaterial({ color: 0xb09a72, roughness: 1, metalness: 0 }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -7.4

    scene.add(sun, glow, arch, pL, pR, floor)

    const light = new THREE.AmbientLight(0xffe0b0, 0.5)
    scene.add(light)
    const dir = new THREE.DirectionalLight(0xffe0b0, 2.2)
    dir.position.set(2, 6, 5)
    scene.add(dir)
    const rim = new THREE.DirectionalLight(0xff9a4a, 0.8)
    rim.position.set(-4, 2, -3)
    scene.add(rim)

    /* ---- embers ---- */
    const COUNT = 320
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const r = Math.sqrt(Math.random()) * 7.5
      const a = Math.random() * Math.PI * 2
      positions[i * 3] = Math.cos(a) * r
      positions[i * 3 + 1] = Math.random() * 6.5 - 2
      positions[i * 3 + 2] = -1 + Math.sin(a) * r * 0.6
    }
    const emberGeo = new THREE.BufferGeometry()
    emberGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const embers = new THREE.Points(
      emberGeo,
      new THREE.PointsMaterial({
        color: 0xff9a4a,
        size: 0.055,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    scene.add(embers)

    /* ---- mouse parallax ---- */
    let tx = 0
    let ty = 0
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1
      ty = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const clock = new THREE.Clock()
    let rafId
    const loop = () => {
      const t = clock.getElapsedTime()
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // idle breathing
      sun.scale.setScalar(1 + Math.sin(t * 1.1) * 0.02)
      glow.scale.setScalar(13 + Math.sin(t * 1.1 + 0.6) * 1.2)

      arch.rotation.z = Math.sin(t * 0.24) * 0.045
      arch.position.y = Math.sin(t * 0.5) * 0.06
      embers.rotation.y = t * (reduced ? 0 : 0.02)

      // mouse parallax tilt (WOW-02)
      const cx = reduced ? 0 : (tx * 1.6 - camera.position.x) * 0.045
      const cy = reduced ? 0 : (ty * 1.1 - (camera.position.y - 1.6)) * 0.05
      camera.position.x += cx
      camera.position.y += cy
      camera.lookAt(0, 1.4, 0)

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', onMove)
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          mats.forEach((m) => {
            if (m.map) m.map.dispose()
            m.dispose()
          })
        }
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="hero-canvas" ref={mountRef} aria-hidden="true" />
}