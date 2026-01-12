import { create } from 'zustand'
import type { Feature, Geometry } from 'geojson'

export type ShapeType = 'Polygon' | 'Rectangle' | 'Circle' | 'LineString'

export interface ExtendedFeature extends Feature<Geometry> {
  properties: {
    id: string
    shapeType: ShapeType
    radius?: number 
    [key: string]: any
  }
}

interface FeatureState {
  features: ExtendedFeature[]
  maxShapes: Record<ShapeType, number>
  addFeature: (f: ExtendedFeature) => void
  removeFeature: (id: string) => void
  setFeatures: (features: ExtendedFeature[]) => void
  updateMaxShapes: (type: ShapeType, count: number) => void
  reset: () => void
}

export const useFeatureStore = create<FeatureState>((set) => ({
  features: [],
  maxShapes: {
    Polygon: 10,
    Rectangle: 10,
    Circle: 10,
    LineString: 10,
  },
  addFeature: (f) =>
    set((state) => ({ features: [...state.features, f] })),
  removeFeature: (id) =>
    set((state) => ({ features: state.features.filter((f) => f.properties.id !== id) })),
  setFeatures: (features) => set({ features }),
  updateMaxShapes: (type, count) =>
    set((state) => ({
      maxShapes: { ...state.maxShapes, [type]: count },
    })),
  reset: () => set({ features: [] }),
}))
