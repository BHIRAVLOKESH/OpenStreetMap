import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-draw/dist/leaflet.draw.js'
import { useFeatureStore, type ExtendedFeature } from '../store/useFeatureStore'
import { validateAndTrimFeature } from '../utils/geoUtils'
import { v4 as uuidv4 } from 'uuid'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const INDIA_CENTER: [number, number] = [20.5937, 78.9629]

export default function MapView() {
  const mapRef = useRef<L.Map | null>(null)
  const drawnItemsRef = useRef<L.FeatureGroup>(new L.FeatureGroup())

  const { features, addFeature, removeFeature, maxShapes } = useFeatureStore()

  const featuresRef = useRef(features)
  useEffect(() => { featuresRef.current = features }, [features])

  const maxShapesRef = useRef(maxShapes)
  useEffect(() => { maxShapesRef.current = maxShapes }, [maxShapes])
  useEffect(() => {
    const drawnItems = drawnItemsRef.current
    drawnItems.clearLayers()

    features.forEach((feature) => {
      L.geoJSON(feature as any, {
        pointToLayer: (feature, latlng) => {
          if (feature.properties?.shapeType === 'Circle' && feature.properties.radius) {
            return L.circle(latlng, { radius: feature.properties.radius })
          }
          return L.marker(latlng)
        },
        onEachFeature: (feature, layer) => {
          (layer as any).feature = feature
        }
      }).eachLayer((layer) => {
        drawnItems.addLayer(layer)
      })
    })

  }, [features])
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex' }}>
      <MapContainer
        center={INDIA_CENTER}
        zoom={5}
        style={{ flex: 1, zIndex: 1 }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <MapController
          featuresRef={featuresRef}
          maxShapesRef={maxShapesRef}
          addFeature={addFeature}
          removeFeature={removeFeature}
          drawnItemsRef={drawnItemsRef}
        />
      </MapContainer>
    </div>
  )
}
function MapController({ featuresRef, maxShapesRef, addFeature, removeFeature, drawnItemsRef }: any) {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    map.addLayer(drawnItemsRef.current)
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItemsRef.current,
        remove: true,
        edit: false
      },
      draw: {
        polygon: {},
        rectangle: {},
        circle: {},
        polyline: {},
        marker: false,
        circlemarker: false,
      },
    })
    map.addControl(drawControl)

    const handleCreated = (e: any) => {
      const layer = e.layer
      const type = e.layerType

      const shapeTypeMap: Record<string, string> = {
        polygon: 'Polygon',
        rectangle: 'Rectangle',
        circle: 'Circle',
        polyline: 'LineString'
      }
      const shapeType = shapeTypeMap[type] || 'Polygon'

      const currentFeatures = featuresRef.current
      const currentMax = maxShapesRef.current as any

      const currentCount = currentFeatures.filter((f: any) => f.properties.shapeType === shapeType).length
      if (currentCount >= currentMax[shapeType]) {
        alert(`Limit reached for ${shapeType} (${(currentMax)[shapeType]})`)
        return
      }

      const id = uuidv4()
      let newFeature: ExtendedFeature

      if (type === 'circle') {
        const circle = layer as L.Circle
        newFeature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [circle.getLatLng().lng, circle.getLatLng().lat]
          },
          properties: {
            id,
            shapeType: 'Circle',
            radius: circle.getRadius()
          }
        }
      } else {
        const geo = layer.toGeoJSON() as any
        newFeature = {
          ...geo,
          properties: {
            ...geo.properties,
            id,
            shapeType: shapeType as any
          }
        }
      }

      const result = validateAndTrimFeature(newFeature, currentFeatures)
      if (result.error) {
        alert(result.error)
      } else if (result.feature) {
        addFeature(result.feature)
      }
    }

    const handleDeleted = (e: any) => {
      e.layers.eachLayer((layer: any) => {
        const featureId = layer.feature?.properties?.id
        if (featureId) {
          removeFeature(featureId)
        }
      })
    }

    map.on(L.Draw.Event.CREATED, handleCreated)
    map.on(L.Draw.Event.DELETED, handleDeleted)

    return () => {
      map.removeControl(drawControl)
      map.off(L.Draw.Event.CREATED, handleCreated)
      map.off(L.Draw.Event.DELETED, handleDeleted)
    }
  }, [map]) 

  return null
}
