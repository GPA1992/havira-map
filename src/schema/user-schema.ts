import { z } from 'zod'

const userFormSchema = z.object({
  name: z.string().min(1, 'Nome do Usuário deve ser preenchido'),
  email: z.string().email('Email inválido').min(1, 'Email deve ser preenchido'),
  city: z.string().min(1, 'Nome do Usuário deve ser preenchido'),
  coordinateType: z.enum(['geo', 'utm']),
  lat: z.string().min(1, 'Latitude deve ser preenchida'),
  lng: z.string().min(1, 'Longitude deve ser preenchida'),
  zone: z.string(),
})

export default userFormSchema
