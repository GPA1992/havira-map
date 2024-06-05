'use client'

import { EraserIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { toast } from '../ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { cn } from '@/lib/utils'
import { ToastAction } from '@/components/ui/toast'
import { useDispatch } from 'react-redux'
import { deleteUserData } from '@/lib/features/users/userSlice'
import { DialogClose } from '@radix-ui/react-dialog'
interface Props {
  id: number
}
export default function DeleteUserButton({ id }: Props) {
  const dispatch = useDispatch()
  const handleDeleteClick = () => {
    dispatch(deleteUserData(id))
    toast({
      className: cn(
        'top-0 left-2/4 flex fixed md:max-w-[420px] md:top-4 md:right-4',
      ),
      title: 'Sucesso!',
      description: 'Usuário Deletado!',
      action: <ToastAction altText="Fechar toaster">Fechar</ToastAction>,
    })
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size="icon">
            <EraserIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Você tem certeza?</DialogTitle>
            <DialogDescription>
              O usuário será removido da lista!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDeleteClick}
              >
                Deletar
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
