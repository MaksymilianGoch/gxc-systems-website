'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Node data — orbital positions ─────────────────────────────────── */
const NODE_CONFIG = [
  { radius: 2.6, angle: 0,                speed: 0.18, size: 0.07, height: 0.4,  color: '#3B82F6' },
  { radius: 2.9, angle: Math.PI * 0.4,    speed: 0.14, size: 0.09, height: -0.6, color: '#06B6D4' },
  { radius: 2.4, angle: Math.PI * 0.8,    speed: 0.22, size: 0.06, height: 0.8,  color: '#3B82F6' },
  { radius: 3.1, angle: Math.PI * 1.2,    speed: 0.16, size: 0.08, height: -0.3, color: '#06B6D4' },
  { radius: 2.7, angle: Math.PI * 1.6,    speed: 0.20, size: 0.07, height: 0.5,  color: '#60A5FA' },
  { radius: 2.5, angle: Math.PI * 0.2,    speed: 0.12, size: 0.10, height: -0.8, color: '#3B82F6' },
  { radius: 3.0, angle: Math.PI * 1.0,    speed: 0.25, size: 0.05, height: 0.2,  color: '#06B6D4' },
  { radius: 2.8, angle: Math.PI * 1.8,    speed: 0.17, size: 0.08, height: -0.5, color: '#60A5FA' },
]

/* ─── Central Core sphere ─────────────────────────────────────────────── */
function Core() {
  const groupRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const outerRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.06
    }
    if (innerRef.current) {
      const s = 1 + Math.sin(t * 0.8) * 0.025
      innerRef.current.scale.setScalar(s)
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.05
      outerRef.current.rotation.z = t * 0.03
    }
  })

  return (
    <group ref={groupRef}>
      {/* Inner core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.9, 48, 48]} />
        <meshPhysicalMaterial
          color="#0A1628"
          emissive="#0E4D8A"
          emissiveIntensity={0.4}
          metalness={0.95}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[1.05, 14, 14]} />
        <meshBasicMaterial
          color="#3B82F6"
          wireframe
          transparent
          opacity={0.07}
        />
      </mesh>

      {/* Equatorial ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.008, 4, 80]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.35} />
      </mesh>

      {/* Tilted ring */}
      <mesh rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[1.55, 0.005, 4, 80]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.2} />
      </mesh>

      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshBasicMaterial
          color="#1E40AF"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

/* ─── Orbital nodes ───────────────────────────────────────────────────── */
function OrbitalNodes() {
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    NODE_CONFIG.forEach((cfg, i) => {
      const mesh = nodeRefs.current[i]
      if (!mesh) return
      const angle = cfg.angle + t * cfg.speed
      mesh.position.x = Math.cos(angle) * cfg.radius
      mesh.position.z = Math.sin(angle) * cfg.radius
      mesh.position.y = cfg.height + Math.sin(t * 0.3 + i) * 0.15
      const pulse = 1 + Math.sin(t * 1.5 + i * 0.8) * 0.15
      mesh.scale.setScalar(pulse)
    })
  })

  return (
    <group>
      {NODE_CONFIG.map((cfg, i) => (
        <mesh
          key={i}
          ref={(el) => { nodeRefs.current[i] = el }}
          position={[Math.cos(cfg.angle) * cfg.radius, cfg.height, Math.sin(cfg.angle) * cfg.radius]}
        >
          <sphereGeometry args={[cfg.size, 12, 12]} />
          <meshStandardMaterial
            color={cfg.color}
            emissive={cfg.color}
            emissiveIntensity={0.8}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Connection lines from center to nodes ───────────────────────────── */
function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    const positions: number[] = []
    NODE_CONFIG.forEach((cfg) => {
      positions.push(0, 0, 0)
      positions.push(
        Math.cos(cfg.angle) * cfg.radius,
        cfg.height,
        Math.sin(cfg.angle) * cfg.radius,
      )
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial
      mat.opacity = 0.06 + Math.sin(t * 0.5) * 0.03
    }
  })

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#3B82F6" transparent opacity={0.08} />
    </lineSegments>
  )
}

/* ─── Node-to-node connections ────────────────────────────────────────── */
function NodeConnections() {
  const geometry = useMemo(() => {
    const pairs = [[0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [0, 5], [1, 6]]
    const positions: number[] = []
    pairs.forEach(([a, b]) => {
      const ca = NODE_CONFIG[a]
      const cb = NODE_CONFIG[b]
      positions.push(Math.cos(ca.angle) * ca.radius, ca.height, Math.sin(ca.angle) * ca.radius)
      positions.push(Math.cos(cb.angle) * cb.radius, cb.height, Math.sin(cb.angle) * cb.radius)
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#06B6D4" transparent opacity={0.05} />
    </lineSegments>
  )
}

/* ─── Ambient particles ───────────────────────────────────────────────── */
function Particles() {
  const count = 200

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return g
  }, [positions])

  return (
    <points geometry={geo}>
      <pointsMaterial
        color="#3B82F6"
        size={0.02}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

/* ─── Mouse-reactive camera controller ───────────────────────────────── */
function CameraController() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  useFrame(() => {
    smooth.current.x += (mouse.current.x * 0.6 - smooth.current.x) * 0.04
    smooth.current.y += (mouse.current.y * 0.4 - smooth.current.y) * 0.04
    camera.position.x = smooth.current.x
    camera.position.y = 0.5 + smooth.current.y * 0.5
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ─── Main export ─────────────────────────────────────────────────────── */
export function OperationalCore() {
  return (
    <>
      <CameraController />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 4]} color="#3B82F6" intensity={3} />
      <pointLight position={[-4, -2, -4]} color="#06B6D4" intensity={1.5} />
      <pointLight position={[0, 6, 0]} color="#60A5FA" intensity={0.8} />

      {/* Scene */}
      <Core />
      <OrbitalNodes />
      <ConnectionLines />
      <NodeConnections />
      <Particles />
    </>
  )
}
