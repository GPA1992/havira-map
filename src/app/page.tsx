'use client'
import { getUsers } from '@/api/users'
import { IUser } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useDispatch } from 'react-redux'
import { setUserData } from '@/lib/features/users/userSlice'
import PopoverList from '@/components/popover-list/popover-list'
import { ModeToggle } from '@/components/theme-switcher/theme-switcher'
import Image from 'next/image'
import { InputCombobox } from '@/components/input-combobox/input-combobox'

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
      <div className="absolute left-2 top-5 z-10 flex h-fit w-fit flex-row items-end justify-between gap-3 rounded-md bg-background bg-opacity-25 p-3">
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
            <span>Sistema de Localização de Usuários</span>
          </div>
        </div>
        <div className="ml-5 flex h-16 items-start">
          <ModeToggle />
        </div>
      </div>
      <div className="absolute left-2 top-32 z-10 flex h-fit flex-col items-start gap-2">
        <PopoverList />
        <InputCombobox />
      </div>
      <LazyMap />
    </div>
  )
}
