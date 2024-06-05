'use client'

import { CopyIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { toast } from '../ui/use-toast'

import { cn } from '@/lib/utils'
import { ToastAction } from '@/components/ui/toast'

interface Props {
  email: string
}
export default function EmailCopyButton({ email }: Props) {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(email).then(() => {
      toast({
        className: cn(
          'top-0 left-2/4 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        title: 'Sucesso!',
        description: 'Email copiado!',
        action: <ToastAction altText="Fechar toaster">Fechar</ToastAction>,
      })
    })
  }
  return (
    <div>
      <Button onClick={handleCopyClick} variant="secondary" size="icon">
        <CopyIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
