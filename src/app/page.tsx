'use client'
import { getUsers } from '@/api/users'
import { IUser } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setUserData } from '@/lib/features/users/userSlice'
import PopoverList from '@/components/popover-list/popover-list'
import { ModeToggle } from '@/components/theme-switcher/theme-switcher'
import Image from 'next/image'
import { InputCombobox } from '@/components/input-combobox/input-combobox'
import { Skeleton } from '@/components/ui/skeleton'

const LazyMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <Skeleton className="h-[20px] w-[100px] rounded-full" />
    </div>
  ),
})

export default function Home() {
  const dispatch = useDispatch()
  const { data, error, isSuccess } = useQuery<IUser[], Error>({
    queryKey: ['getUsers'],
    queryFn: () => getUsers(),
  })

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUserData(data))
    }
  }, [isSuccess, data, dispatch])

  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (!isSuccess) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Skeleton className="h-[20px] w-[100px] rounded-full" />
      </div>
    )
  }



  return (
    <div className="relative h-full w-full">
      <div className="absolute left-8 top-8 z-10 flex h-fit w-fit flex-row items-end justify-between gap-3 rounded-md bg-background bg-opacity-25 p-3">
        <div className="flex flex-row items-center gap-3">
          <Image
            className="rounded-full"
            src="/havira_logo.jpeg"
            width={70}
            height={70}
            alt="Picture of the author"
          />

          <div>
            <h1 className="text-2xl font-bold">Hávira Map</h1>
            <span>Sistema de localização de usuários</span>
          </div>
        </div>
        <div className="ml-5 flex h-16 items-start">
          <ModeToggle />
        </div>
      </div>
      <div className="absolute left-8 top-36 z-10 flex h-fit flex-col items-start gap-2">
        <PopoverList />
        <InputCombobox />
      </div>
      <LazyMap />
    </div>
  )
}
