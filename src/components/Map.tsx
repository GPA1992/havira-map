'use client'

// IMPORTANT: the order matters!
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { Map } from 'leaflet'

export default function CustomMap() {
  const { userData } = useSelector((state: RootState) => state.users)
  const { zoom, lat, lng } = useSelector((state: RootState) => state.squareZoom)
  const mapRef = useRef<Map | null>(null)

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lng], zoom)
    }
  }, [lat, lng, zoom])

  return (
    <MapContainer
      center={[lat, lng]}
      dragging={true}
      zoom={zoom}
      scrollWheelZoom={true}
      zoomControl={false}
      className="absolute z-0 h-full w-full"
      ref={mapRef}
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
      <ZoomControl position="bottomright" />
    </MapContainer>
  )
}
