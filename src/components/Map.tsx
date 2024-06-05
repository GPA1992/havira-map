'use client'

// IMPORTANT: the order matters!
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'

export default function Map() {
  const { userData } = useSelector((state: RootState) => state.users)
  return (
    <MapContainer
      center={[40.8054, -74.0241]}
      zoom={3}
      scrollWheelZoom={false}
      className="absolute z-0 h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userData?.map((user) => (
        <Marker
          key={user.id}
          position={[
            parseFloat(user.address.geo.lat),
            parseFloat(user.address.geo.lng),
          ]}
        >
          <Popup>
            {user.name} <br /> {user.email}
          </Popup>
        </Marker>
      ))}
      {/* <Marker
        eventHandlers={eventHandlers}
        position={[40.8054, -74.0241]}
        draggable={true}
        ref={markerRef}
      >
        <Popup>Hey ! you found me</Popup>
      </Marker> */}
    </MapContainer>
  )
}
