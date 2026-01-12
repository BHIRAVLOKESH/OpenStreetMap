import MapView from './components/MapView'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <>
      <Sidebar />
      <div className="map-container">
        <MapView />
      </div>
    </>
  )
}
