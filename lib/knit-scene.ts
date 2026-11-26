import * as THREE from 'three'
import { buildKnitMaps, PRESETS, type Colorway, type PresetId } from '@/lib/knit-textures'

const PLANE_W = 4
const PLANE_H = 3
const SEG_X = 110
const SEG_Y = 82
const MAX_YAW = 0.75
const MAX_PITCH = 0.5

export class KnitScene {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(34, 4 / 3, 0.1, 50)
  private group = new THREE.Group()
  private geometry: THREE.PlaneGeometry
  private material: THREE.MeshStandardMaterial
  private mesh: THREE.Mesh
  private wire: THREE.Mesh
  private base: Float32Array
  private textures: THREE.CanvasTexture[] = []

  private ruffle = false
  private reduced: boolean
  private running = false
  private visible = true
  private raf = 0
  private last = 0
  private time = 0

  private yaw = 0
  private pitch = 0
  private targetYaw = -0.18
  private targetPitch = 0.1
  private dragging = false
  private lastX = 0
  private lastY = 0
  private pointer = { x: 0, y: 0, energy: 0 }
  private pop = 0

  constructor(
    private canvas: HTMLCanvasElement,
    opts: { reducedMotion: boolean },
  ) {
    this.reduced = opts.reducedMotion
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    this.renderer.setClearColor(0x000000, 0)

    this.camera.position.set(0, 0, 6.4)
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xe5e0d8, 1.25))
    const key = new THREE.DirectionalLight(0xffffff, 1.9)
    key.position.set(2.5, 3, 4)
    this.scene.add(key)
    const fill = new THREE.DirectionalLight(0xdbe4ff, 0.55)
    fill.position.set(-3, -1, 2)
    this.scene.add(fill)

    this.geometry = new THREE.PlaneGeometry(PLANE_W, PLANE_H, SEG_X, SEG_Y)
    this.base = (this.geometry.attributes.position.array as Float32Array).slice()
    this.material = new THREE.MeshStandardMaterial({
      roughness: 0.95,
      metalness: 0,
      side: THREE.DoubleSide,
      bumpScale: 2.4,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.wire = new THREE.Mesh(
      this.geometry,
      new THREE.MeshBasicMaterial({
        color: 0x1d4ed8,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
        depthTest: false,
      }),
    )
    this.wire.visible = false
    this.wire.renderOrder = 2
    this.group.add(this.mesh, this.wire)
    this.scene.add(this.group)

    canvas.addEventListener('pointerdown', this.onDown)
    canvas.addEventListener('pointermove', this.onMove)
    canvas.addEventListener('pointerup', this.onUp)
    canvas.addEventListener('pointercancel', this.onUp)
    canvas.addEventListener('pointerleave', this.onLeave)
    canvas.addEventListener('keydown', this.onKey)
  }

  setLook(preset: PresetId, colorway: Colorway) {
    const maps = buildKnitMaps(preset, colorway)
    this.textures.forEach((t) => t.dispose())
    this.textures = []

    const make = (c: HTMLCanvasElement, srgb: boolean) => {
      const t = new THREE.CanvasTexture(c)
      if (srgb) t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy())
      this.textures.push(t)
      return t
    }

    this.material.map = make(maps.color, true)
    this.material.bumpMap = make(maps.height, false)
    if (maps.alpha) {
      this.material.alphaMap = make(maps.alpha, false)
      this.material.alphaTest = 0.5
    } else {
      this.material.alphaMap = null
      this.material.alphaTest = 0
    }
    this.material.needsUpdate = true

    this.ruffle = PRESETS.find((p) => p.id === preset)?.ruffle ?? false
    this.pop = 1
    this.updateGeometry()
    this.renderOnce()
  }

  setTopology(on: boolean) {
    this.wire.visible = on
    this.renderOnce()
  }

  resetView() {
    this.targetYaw = -0.18
    this.targetPitch = 0.1
    this.renderOnce()
  }

  setVisible(v: boolean) {
    this.visible = v
    if (v) this.start()
    else this.stop()
  }

  resize(width: number, height: number) {
    if (width < 2 || height < 2) return
    this.renderer.setSize(width, height, false)
    this.camera.aspect = width / height
    // Keep the swatch fully framed on narrow containers.
    const needed = PLANE_W / PLANE_H
    this.camera.position.z = this.camera.aspect < needed ? 6.4 * (needed / this.camera.aspect) * 0.92 : 6.4
    this.camera.updateProjectionMatrix()
    this.renderOnce()
  }

  start() {
    if (this.reduced || this.running || !this.visible) return
    this.running = true
    this.last = performance.now()
    this.raf = requestAnimationFrame(this.loop)
  }

  stop() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  dispose() {
    this.stop()
    const c = this.canvas
    c.removeEventListener('pointerdown', this.onDown)
    c.removeEventListener('pointermove', this.onMove)
    c.removeEventListener('pointerup', this.onUp)
    c.removeEventListener('pointercancel', this.onUp)
    c.removeEventListener('pointerleave', this.onLeave)
    c.removeEventListener('keydown', this.onKey)
    this.textures.forEach((t) => t.dispose())
    this.geometry.dispose()
    this.material.dispose()
    ;(this.wire.material as THREE.Material).dispose()
    this.renderer.dispose()
  }

  private loop = (now: number) => {
    if (!this.running) return
    this.raf = requestAnimationFrame(this.loop)
    const dt = Math.min(0.05, (now - this.last) / 1000)
    this.last = now
    this.time += dt

    const k = 1 - Math.exp(-7 * dt)
    const sway = this.dragging ? 0 : Math.sin(this.time * 0.35) * 0.07
    this.yaw += (this.targetYaw + sway - this.yaw) * k
    this.pitch += (this.targetPitch - this.pitch) * k
    this.pointer.energy *= Math.exp(-1.6 * dt)
    this.pop *= Math.exp(-5 * dt)

    this.updateGeometry()
    this.draw()
  }

  private renderOnce() {
    if (this.running) return
    this.yaw = this.targetYaw
    this.pitch = this.targetPitch
    this.draw()
  }

  private draw() {
    this.group.rotation.y = this.yaw
    this.group.rotation.x = this.pitch
    const s = 1 - 0.05 * this.pop
    this.group.scale.set(s, s, s)
    this.renderer.render(this.scene, this.camera)
  }

  private updateGeometry() {
    const pos = this.geometry.attributes.position
    const arr = pos.array as Float32Array
    const t = this.reduced ? 0 : this.time
    const amp = this.reduced ? 0 : 0.085
    const { x: px, y: py, energy } = this.pointer

    for (let i = 0; i < arr.length; i += 3) {
      const ox = this.base[i]
      const oy = this.base[i + 1]
      const v = (PLANE_H / 2 - oy) / PLANE_H

      let z = 0
      if (amp > 0) {
        const wave =
          Math.sin(ox * 1.6 + t * 0.9) * 0.6 + Math.sin(oy * 2.1 - t * 0.7 + ox * 0.8) * 0.4
        z = amp * wave * (0.3 + 0.7 * v)
        if (energy > 0.01) {
          const dx = ox - px
          const dy = oy - py
          const d2 = dx * dx + dy * dy
          z += energy * 0.14 * Math.exp(-d2 * 1.8) * Math.cos(Math.sqrt(d2) * 8 - t * 6)
        }
      }

      if (this.ruffle && v > 0.9) {
        const f = (v - 0.9) / 0.1
        z += Math.sin(ox * 26 + 0.4) * 0.05 * f * f
      }

      arr[i + 2] = z
    }
    pos.needsUpdate = true
    this.geometry.computeVertexNormals()
  }

  private nudge(dx: number, dy: number) {
    this.targetYaw = THREE.MathUtils.clamp(this.targetYaw + dx, -MAX_YAW, MAX_YAW)
    this.targetPitch = THREE.MathUtils.clamp(this.targetPitch + dy, -MAX_PITCH, MAX_PITCH)
    this.renderOnce()
  }

  private onDown = (e: PointerEvent) => {
    this.dragging = true
    this.lastX = e.clientX
    this.lastY = e.clientY
    this.canvas.setPointerCapture(e.pointerId)
    this.canvas.style.cursor = 'grabbing'
  }

  private onMove = (e: PointerEvent) => {
    const rect = this.canvas.getBoundingClientRect()
    const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const ndcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    const halfH = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * this.camera.position.z
    this.pointer.x = ndcX * halfH * this.camera.aspect
    this.pointer.y = ndcY * halfH
    if (!this.reduced) this.pointer.energy = Math.min(1, this.pointer.energy + 0.12)

    if (this.dragging) {
      this.nudge((e.clientX - this.lastX) * 0.006, (e.clientY - this.lastY) * 0.004)
      this.lastX = e.clientX
      this.lastY = e.clientY
    }
  }

  private onUp = (e: PointerEvent) => {
    this.dragging = false
    this.canvas.style.cursor = 'grab'
    if (this.canvas.hasPointerCapture(e.pointerId)) this.canvas.releasePointerCapture(e.pointerId)
  }

  private onLeave = () => {
    if (!this.dragging) this.canvas.style.cursor = 'grab'
  }

  private onKey = (e: KeyboardEvent) => {
    const step = 0.12
    if (e.key === 'ArrowLeft') this.nudge(-step, 0)
    else if (e.key === 'ArrowRight') this.nudge(step, 0)
    else if (e.key === 'ArrowUp') this.nudge(0, -step)
    else if (e.key === 'ArrowDown') this.nudge(0, step)
    else if (e.key === '0' || e.key === 'Home') this.resetView()
    else return
    e.preventDefault()
  }
}
