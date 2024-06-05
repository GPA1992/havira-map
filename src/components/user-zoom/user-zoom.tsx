'use client'
import {
  setLat,
  setLng,
  setZoom,
} from '@/lib/features/squareZoom/squareZoomSlice'
import { useDispatch } from 'react-redux'
import { RocketIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

interface UserZoomProps {
  lat: number
  lng: number
}
export default function UserZoom({ lat, lng }: UserZoomProps) {
  const dispatch = useDispatch()

  const handleZoomClick = () => {
    dispatch(setLat(lat))
    dispatch(setLng(lng))
    dispatch(setZoom(14))
  }
  return (
    <div>
      <Button onClick={handleZoomClick} size="icon">
        <RocketIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
