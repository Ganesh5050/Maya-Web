"use client"
import { useEffect, useRef, useState } from "react"
import { Color } from "three"
import ThreeGlobe from "three-globe"
import { useThree, Canvas, extend } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { feature } from "topojson-client"
declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): ThreeGlobe
    }
  }
}

extend({ ThreeGlobe: ThreeGlobe })

const RING_PROPAGATION_SPEED = 3
const aspect = 1.2
const cameraZ = 200

type Position = {
  order: number
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  arcAlt: number
  color: string
}

export type GlobeConfig = {
  pointSize?: number
  globeColor?: string
  showAtmosphere?: boolean
  atmosphereColor?: string
  atmosphereAltitude?: number
  polygonColor?: string
  ambientLight?: string
  directionalLeftLight?: string
  directionalTopLight?: string
  pointLight?: string
  arcTime?: number
  arcLength?: number
  rings?: number
  maxRings?: number
  initialPosition?: {
    lat: number
    lng: number
  }
  autoRotate?: boolean
  autoRotateSpeed?: number
}

interface WorldProps {
  globeConfig: GlobeConfig
  data: Position[]
}

const numbersOfRings = [0]

// Helper to set the default camera position safely (avoid passing custom camera instance)
function SetCamera() {
  const { camera } = useThree()
  useEffect(() => {
    camera.position.set(0, 0, cameraZ)
    camera.updateProjectionMatrix()
  }, [])
  return null
}

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null)
  const groupRef = useRef()
  const [isInitialized, setIsInitialized] = useState(false)
  const [countriesFeatures, setCountriesFeatures] = useState<any[]>([])

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: false,
    atmosphereAltitude: 0.08,
    polygonColor: "#2b2b2b",
    globeColor: "#0b0d10",
    emissive: "#000000",
    emissiveIntensity: 0.08,
    shininess: 0.4,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  }

  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe()
      ;(groupRef.current as any).add(globeRef.current)
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    async function loadCountries() {
      try {
        const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        const topo = await res.json()
        const geo = feature(topo, (topo as any).objects.countries) as any
        if (!cancelled) setCountriesFeatures(geo.features || [])
      } catch (_e) {}
    }
    loadCountries()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!globeRef.current || !isInitialized) return

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color
      emissive: Color
      emissiveIntensity: number
      shininess: number
      transparent: boolean
      opacity: number
      depthWrite: boolean
    }
    globeMaterial.color = new Color(defaultProps.globeColor)
    globeMaterial.emissive = new Color(defaultProps.emissive)
    globeMaterial.emissiveIntensity = defaultProps.emissiveIntensity || 0.08
    globeMaterial.shininess = defaultProps.shininess || 0.4
    globeMaterial.transparent = true
    globeMaterial.opacity = 0.15
    globeMaterial.depthWrite = true
  }, [
    isInitialized,
    defaultProps.globeColor,
    defaultProps.emissive,
    defaultProps.emissiveIntensity,
    defaultProps.shininess,
  ])

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return

    const arcs = data
    const points: any[] = []
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i]
      const rgb = hexToRgb(arc.color) as { r: number; g: number; b: number }
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      })
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      })
    }

    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) => ["lat", "lng"].every((k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"])) === i,
    )

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
      .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
      .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
      .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
      .arcColor((e: any) => (e as { color: string }).color)
      .arcAltitude((e) => (e as { arcAlt: number }).arcAlt * 1)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => (e as { order: number }).order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime)

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e) => (e as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2)

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings)
  }, [
    isInitialized,
    data,
    defaultProps.pointSize,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
  ])

  useEffect(() => {
    if (!globeRef.current || !isInitialized || countriesFeatures.length === 0) return

    globeRef.current
      .polygonsData(countriesFeatures)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .polygonCapColor(() => defaultProps.polygonColor)
      .polygonSideColor(() => defaultProps.polygonColor)
      .polygonStrokeColor(() => "#9ca3af")
      .polygonsTransitionDuration(0)
      .polygonAltitude(0.002)
  }, [
    isInitialized,
    countriesFeatures,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
  ])

  return <group ref={groupRef} />
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree()

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio)
    gl.setSize(size.width, size.height)
    gl.setClearColor(0x000000, 0)
  }, [])

  return null
}

function WireframeSphere({
  radius = 100.2,
  color = "#3a3a3a",
  opacity = 0.2,
}: {
  radius?: number
  color?: string
  opacity?: number
}) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  )
}

export function World(props: WorldProps) {
  const { globeConfig } = props
  // Remove custom Scene/Camera instances to avoid read-only position assignment
  // const scene = new Scene()
  // scene.fog = new Fog(0xffffff, 400, 2000)

  return (
    // Let Canvas manage scene/camera; add fog via JSX and set camera with SetCamera
    <Canvas>
      <SetCamera />
      <fog attach="fog" args={[0xffffff, 400, 2000]} />
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.5} />
      {/* Pass positions as arrays so R3F uses .position.set(...) instead of assigning to a read-only property */}
      <directionalLight color={globeConfig.directionalLeftLight} position={[-400, 100, 400]} />
      <directionalLight color={globeConfig.directionalTopLight} position={[-200, 500, 200]} />
      <pointLight color={globeConfig.pointLight} position={[-200, 500, 200]} intensity={0.6} />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
        enableDamping={false}
        enableRotate={true}
        enableZoom={false}
        enablePan={false}
        enableKeys={false}
        makeDefault={false}
      />
    </Canvas>
  )
}

export function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = []
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min
    if (arr.indexOf(r) === -1) arr.push(r)
  }

  return arr
}
