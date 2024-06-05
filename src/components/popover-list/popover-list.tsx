'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { usersColumns } from '@/components/users-table/users-columns'
import { UsersTable } from '@/components/users-table/users-table'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'

export default function PopoverList() {
  const { userData } = useSelector((state: RootState) => state.users)
  if (!userData) return null
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Listar Pessoas</Button>
      </PopoverTrigger>
      <PopoverContent className="absolute z-50 w-fit">
        <UsersTable data={userData} columns={usersColumns} />
      </PopoverContent>
    </Popover>
  )
}
