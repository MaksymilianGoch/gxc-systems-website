'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── 7 Workflow-Knoten mit festen Positionen ──────────────────────────── */
// Anfrage → KI → CRM → Routing → Antwort → Tracking → Termin
const WORKFLOW_NODES = [
  { pos: [-3.2,  0.6,  0.5], color: '#2563EB', size: 0.10, label: '01' },
  { pos: [-1.4,  1.2,  -0.4], color: '#2563EB', size: 0.09, label: '02' },
  { pos: [ 0.0,  0.8,  0.8], color: '#3B82F6', size: 0.11, label: '03' },
  { pos: [ 0.0, -0.4, -0.6], color: '#2563EB', size: 0.09, label: '04' },
  { pos: [ 1.4,  1.0,  0.3], color: '#3B82F6', size: 0.10, label: '05' },
  { pos: [ 1.8, -0.8,  0.7], color: '#2563EB', size: 0.08, label: '06' },
  { pos: [ 3.0,  0.2, -0.2], color: '#3B82F6', size: 0.12, label: '07' },
]

// Verbindungen zwischen den Knoten (Datenfluss)
const CONNECTIONS = [
  [0, 1], [1, 2], [1, 3],
  [2, 4], [3, 4], [3, 5],
  [4, 6], [5, 6],
]

/* ─── Kern-Visualisierung ─────────────────────────────────────────────── */
function WorkflowCore() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (groupRef.current) {
      // Sehr langsame Rotation — max 8° pro Achse
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.14
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.08
    }
  })

  return <group ref={groupRef}>
    <WorkflowNodes />
    <ConnectionLines />
    <DataPulses />
    <AmbientField />
  </group>
}

/* ─── Workflow-Knoten ─────────────────────────────────────────────────── */
function WorkflowNodes() {
  const refs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    WORKFLOW_NODES.forEach((_, i) => {
      const mesh = refs.current[i]
      if (!mesh) return
      // Subtiler Puls pro Knoten (versetzt)
      const pulse = 1 + Math.sin(t * 0.9 + i * 0.7) * 0.08
      mesh.scale.setScalar(pulse)
    })
  })

  return <group>
    {WORKFLOW_NODES.map((node, i) => (
      <mesh
        key={i}
        ref={(el) => { refs.current[i] = el }}
        position={node.pos as [number, number, number]}
      >
        <sphereGeometry args={[node.size, 16, 16]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={0.9}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    ))}
  </group>
}

/* ─── Verbindungslinien ───────────────────────────────────────────────── */
function ConnectionLines() {
  const geometry = useMemo(() => {
    const positions: number[] = []
    CONNECTIONS.forEach(([a, b]) => {
      const na = WORKFLOW_NODES[a].pos
      const nb = WORKFLOW_NODES[b].pos
      positions.push(...na, ...nb)
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#2563EB" transparent opacity={0.18} />
    </lineSegments>
  )
}

/* ─── Animierte Datenpulse auf den Verbindungen ───────────────────────── */
function DataPulses() {
  const pulsesRef = useRef<(THREE.Mesh | null)[]>([])
  const offsets = useMemo(
    () => CONNECTIONS.map((_, i) => (i / CONNECTIONS.length) * Math.PI * 2),
    [],
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    CONNECTIONS.forEach(([a, b], i) => {
      const mesh = pulsesRef.current[i]
      if (!mesh) return
      const na = WORKFLOW_NODES[a].pos
      const nb = WORKFLOW_NODES[b].pos
      // Lichtpuls bewegt sich von A nach B im Loop
      const progress = ((t * 0.4 + offsets[i]) % (Math.PI * 2)) / (Math.PI * 2)
      const smoothP = progress < 0.5 ? progress * 2 : (1 - progress) * 2
      mesh.position.set(
        na[0] + (nb[0] - na[0]) * smoothP,
        na[1] + (nb[1] - na[1]) * smoothP,
        na[2] + (nb[2] - na[2]) * smoothP,
      )
      // Opacity: nur sichtbar wenn der Puls aktiv ist
      const mat = mesh.material as THREE.MeshBasicMaterial
      mat.opacity = progress < 0.85 ? 0.7 : 0
    })
  })

  return <group>
    {CONNECTIONS.map((_, i) => (
      <mesh key={i} ref={(el) => { pulsesRef.current[i] = el }}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.7} />
      </mesh>
    ))}
  </group>
}

/* ─── Hintergrund-Partikel ────────────────────────────────────────────── */
function AmbientField() {
  const geo = useMemo(() => {
    const count = 180
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 3.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return g
  }, [])

  return (
    <points geometry={geo}>
      <pointsMaterial color="#2563EB" size={0.018} transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

/* ─── Maus-Parallax-Kamera ────────────────────────────────────────────── */
function CameraController() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  useFrame(() => {
    // Max 5° Tilt — sanftes Easing
    smooth.current.x += (mouse.current.x * 0.35 - smooth.current.x) * 0.035
    smooth.current.y += (mouse.current.y * 0.25 - smooth.current.y) * 0.035
    camera.position.x = smooth.current.x
    camera.position.y = 0.3 + smooth.current.y * 0.4
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ─── Main Export ─────────────────────────────────────────────────────── */
export function OperationalCore() {
  return (
    <>
      <CameraController />

      {/* Beleuchtung — minimal, präzise */}
      <ambientLight intensity={0.12} />
      <pointLight position={[4, 3, 4]} color="#2563EB" intensity={4} />
      <pointLight position={[-4, -2, -3]} color="#1D4ED8" intensity={2} />
      <pointLight position={[0, 5, 2]} color="#3B82F6" intensity={1.5} />

      <WorkflowCore />
    </>
  )
}
