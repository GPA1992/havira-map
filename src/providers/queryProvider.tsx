'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { customQueryClient } from './queryClient'

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <QueryClientProvider client={customQueryClient}>
      {children}
    </QueryClientProvider>
  )
}
