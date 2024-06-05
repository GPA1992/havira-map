'use client'
import { getUsers } from '@/api/users'

import { IUser } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

import { useDispatch } from 'react-redux'
import { setUserData } from '@/lib/features/users/userSlice'
import PopoverList from '@/components/popover-list/popover-list'

const LazyMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

export default function Home() {
  const dispatch = useDispatch()
  const { data, error, isSuccess } = useQuery<IUser[], Error>({
    queryKey: ['getUsers'],
    queryFn: () => getUsers(),
  })

  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (!isSuccess) {
    return <div>Loading...</div>
  }

  dispatch(setUserData(data))

  return (
    <div className="relative h-full w-full">
      <div className="absolute left-2 top-32 z-10 flex flex-col gap-3 rounded-md border p-3">
        <PopoverList />
      </div>
      <LazyMap />
    </div>
  )
}
