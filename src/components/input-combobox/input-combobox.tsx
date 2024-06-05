'use client'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  setLat,
  setLng,
  setZoom,
} from '@/lib/features/squareZoom/squareZoomSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useEffect, useState } from 'react'
import { IUserPartial } from '@/types/user'

export function InputCombobox() {
  const dispatch = useDispatch()
  const { userData } = useSelector((state: RootState) => state.users)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [user, setUser] = useState<IUserPartial | null>()

  useEffect(() => {
    if (!user) return
    dispatch(setLat(user.lat))
    dispatch(setLng(user.lng))
    dispatch(setZoom(14))
  }, [dispatch, user, value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? userData?.find((user) => user.name === value)?.name
            : 'Seleciona um Usuário...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Usuários..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {userData?.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setUser(user)
                    setOpen(false)
                  }}
                >
                  {user.name}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === user.name ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
