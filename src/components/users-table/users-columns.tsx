'use client'
import { IUser } from '@/types/user'
import { ColumnDef } from '@tanstack/react-table'

export const usersColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'address.city',
    header: 'Cidade',
  },
]
