import { useFeatureStore, type ShapeType } from '../store/useFeatureStore'

export default function Sidebar() {
    const { features, maxShapes, updateMaxShapes, reset } = useFeatureStore()

    const shapeTypes: ShapeType[] = ['Polygon', 'Rectangle', 'Circle', 'LineString']

    const getCount = (type: ShapeType) => features.filter((f) => f.properties.shapeType === type).length

    const handleExport = () => {
        const data = {
            type: 'FeatureCollection',
            features
        }
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'map-features.geojson'
        link.click()
    }

    return (
        <div className="sidebar">
            <h2>OSM Draw App</h2>
            <div className="section">
                <h3>Statistics</h3>
                <ul>
                    {shapeTypes.map((type) => (
                        <li key={type}>
                            {type}: <strong>{getCount(type)}</strong> / {maxShapes[type]}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="section">
                <h3>Configuration</h3>
                {shapeTypes.map((type) => (
                    <div key={type} className="config-item">
                        <label>{type} Limit:</label>
                        <input
                            type="number"
                            min="0"
                            value={maxShapes[type]}
                            onChange={(e) => updateMaxShapes(type, parseInt(e.target.value) || 0)}
                        />
                    </div>
                ))}
            </div>

            <div className="actions">
                <button className="btn primary" onClick={handleExport}>
                    Export GeoJSON
                </button>
                <button className="btn secondary" onClick={reset}>
                    Clear All
                </button>
            </div>

            <div className="instructions">
                <p><strong>Instructions:</strong></p>
                <ul>
                    <li>Use the toolbar on the map to draw shapes.</li>
                    <li>Polygons, Rectangles, and Circles cannot overlap others.</li>
                    <li><strong>Auto-trim</strong> is active for overlapping polygons.</li>
                    <li>You cannot draw a shape that fully encloses another.</li>
                </ul>
            </div>
        </div>
    )
}
