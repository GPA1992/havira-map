'use client'

import { ColumnDef } from '@tanstack/react-table'
import UserZoom from '../user-zoom/user-zoom'
import { IUserPartial } from '@/types/user'

export const usersColumns: ColumnDef<IUserPartial>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'city',
    header: 'Cidade',
  },
  {
    accessorKey: 'id',
    header: 'Voar',
    cell: (data) => {
      const lat = data.cell.row.original.lat
      const lng = data.cell.row.original.lng
      return <UserZoom lat={lat} lng={lng} />
    },
  },
]
