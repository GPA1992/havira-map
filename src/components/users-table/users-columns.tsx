'use client'

import { ColumnDef } from '@tanstack/react-table'
import UserZoom from '../user-zoom/user-zoom'
import { IUserPartial } from '@/types/user'
import EmailCopyButton from '../email-copy-button/email-copy-button'
import DeleteUserButton from '../delete-user-button/delete-user-button'

export const usersColumns: ColumnDef<IUserPartial>[] = [
  {
    accessorKey: 'id',
    header: 'Excluir',
    cell: (data) => {
      return <DeleteUserButton id={Number(data.cell.row.original.id)} />
    },
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (data) => {
      return (
        <div className="flex flex-row items-center">
          <span className="mr-2">{data.cell.row.original.email}</span>
          <EmailCopyButton email={data.cell.row.original.email} />
        </div>
      )
    },
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
