import * as turf from '@turf/turf'
import type { ExtendedFeature } from '../store/useFeatureStore'
import type { Feature, Polygon, MultiPolygon } from 'geojson'

export function validateAndTrimFeature(
  newFeature: ExtendedFeature,
  existingFeatures: ExtendedFeature[]
): { feature: ExtendedFeature | null; error?: string } {
  if (newFeature.properties.shapeType === 'LineString') {
    return { feature: newFeature }
  }
  let currentPoly = toTurfPolygon(newFeature)
  if (!currentPoly) return { feature: newFeature } 
  for (const existing of existingFeatures) {
    if (existing.properties.shapeType === 'LineString') continue

    const existingPoly = toTurfPolygon(existing)
    if (!existingPoly) continue

    if (turf.booleanContains(currentPoly, existingPoly)) {
      return { feature: null, error: 'Cannot fully enclose an existing shape.' }
    }

    if (turf.booleanIntersects(currentPoly, existingPoly)) {
      const difference = turf.difference(turf.featureCollection([currentPoly, existingPoly]))

      if (!difference) {
        
        return { feature: null, error: 'Shape is fully inside an existing shape.' }
      }

      
      currentPoly = difference as Feature<Polygon | MultiPolygon>
    }
  }


  const finalFeature: ExtendedFeature = {
    ...newFeature,
    geometry: currentPoly.geometry,
    properties: {
      ...newFeature.properties,
      shapeType: isTrimmed(newFeature, currentPoly) ? 'Polygon' : newFeature.properties.shapeType
    }
  }

  return { feature: finalFeature }
}

function toTurfPolygon(feature: ExtendedFeature): Feature<Polygon | MultiPolygon> | null {
  if (feature.properties.shapeType === 'Circle' && feature.properties.radius) {
    return turf.circle(feature.geometry as any, feature.properties.radius, { steps: 64, units: 'meters' })
  }
  if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
    return feature as Feature<Polygon | MultiPolygon>
  }
  return null
}

function isTrimmed(original: ExtendedFeature, final: Feature<Polygon | MultiPolygon>): boolean {
  return JSON.stringify(original.geometry) !== JSON.stringify(final.geometry)
}
