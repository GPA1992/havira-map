'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { usersColumns } from '@/components/users-table/users-columns'
import { UsersTable } from '@/components/users-table/users-table'
import { LayersIcon } from '@radix-ui/react-icons'

export default function PopoverList() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <LayersIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="absolute z-50 w-[35vw] min-w-fit">
        <h3 className=" text-3xl font-bold tracking-tight">Usuarios</h3>
        <span className="text-md scroll-m-20 font-light">
          Lista de Usuarios
        </span>
        <UsersTable columns={usersColumns} />
      </PopoverContent>
    </Popover>
  )
}
