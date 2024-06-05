'use client'
import { IUser } from '@/types/user'
import { ColumnDef } from '@tanstack/react-table'
import UserZoom from '../user-zoom/user-zoom'

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
  {
    accessorKey: 'address.zaipcode',
    header: 'Zoom',
    cell: (data) => {
      const { lat, lng } = data.cell.row.original.address.geo

      return <UserZoom lat={parseFloat(lat)} lng={parseFloat(lng)} />
    },
  },
]
