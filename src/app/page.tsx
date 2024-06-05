'use client'
import { getUsers } from '@/api/users'
import { usersColumns } from '@/components/users-table/users-columns'
import { UsersTable } from '@/components/users-table/users-table'
import { IUser } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { PersonIcon } from '@radix-ui/react-icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ModeToggle } from '@/components/theme-switcher/theme-switcher'
import { useDispatch } from 'react-redux'
import { setUserData, setUserRefetch } from '@/lib/features/users/userSlice'

const LazyMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

export default function Home() {
  const dispatch = useDispatch()
  const { data, error, isSuccess, refetch } = useQuery<IUser[], Error>({
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
  dispatch(setUserRefetch(refetch))

  return (
    <div className="relative h-full w-full">
      <div className="absolute left-2 top-20 z-10 flex flex-col gap-3 rounded-md border p-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <PersonIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="absolute z-50 w-fit">
                  <UsersTable data={data} columns={usersColumns} />
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>Listar Usuarios</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <PersonIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="absolute z-50 w-fit">
                  <UsersTable data={data} columns={usersColumns} />
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>Listar Usuarios</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ModeToggle />
      </div>
      <LazyMap />
    </div>
  )
}
