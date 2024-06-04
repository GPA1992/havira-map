'use client'

// IMPORTANT: the order matters!
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useEffect, useMemo, useRef } from 'react'

export default function Map() {
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          // setPosition(marker.getLatLng())
          console.log(marker.getLatLng())
        }
      },
    }),
    [],
  )
  useEffect(() => {
    console.log(markerRef.current)
  }, [markerRef.current])
  const position = [51.505, -0.09]

  return (
    <MapContainer
      center={[40.8054, -74.0241]}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        eventHandlers={eventHandlers}
        position={[40.8054, -74.0241]}
        draggable={true}
        ref={markerRef}
      >
        <Popup>Hey ! you found me</Popup>
      </Marker>
    </MapContainer>
  )
}
