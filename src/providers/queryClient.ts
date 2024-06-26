import { QueryClient } from '@tanstack/react-query'

export const customQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: false,
    },
  },
})
