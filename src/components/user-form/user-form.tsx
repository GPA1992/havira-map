'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToastAction } from '@/components/ui/toast'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '../ui/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import userFormSchema from '@/schema/user-schema'
import { zoneList } from './zoneData'
import { addUserData } from '@/lib/features/users/userSlice'
import { useState } from 'react'
import proj4 from 'proj4'
import { useDispatch } from 'react-redux'

proj4.defs([['EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs']])

const getUtmProjection = (zone: string) => {
  const zoneNumber = parseInt(zone.slice(0, -1))
  const hemisphere = zone.slice(-1).toUpperCase()
  const south = hemisphere === 'S'
  return `+proj=utm +zone=${zoneNumber} ${south ? '+south' : ''} +datum=WGS84 +units=m +no_defs`
}

export default function UserForm() {
  const dispatch = useDispatch()
  const [coordinateType, setCoordinateType] = useState('geo')
  const { toast } = useToast()

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      email: '',
      city: '',
      coordinateType: 'geo',
      lat: '',
      lng: '',
      zone: '',
    },
  })

  function onSubmit(values: z.infer<typeof userFormSchema>) {
    let latitudade = parseFloat(values.lat)
    let longitude = parseFloat(values.lng)
    if (coordinateType === 'utm') {
      const utmProjection = getUtmProjection(values.zone)
      const utmCoordinates = [parseFloat(values.lng), parseFloat(values.lat)]
      const geoCoordinates = proj4(utmProjection, 'EPSG:4326', utmCoordinates)
      const [lng, lat] = geoCoordinates
      latitudade = lat
      longitude = lng
    }

    const newUser = {
      id: Math.floor(Math.random() * 1000),
      name: values.name,
      email: values.email,
      city: values.city,
      lat: latitudade,
      lng: longitude,
    }

    dispatch(addUserData(newUser))
    toast({
      title: 'Sucesso!',
      description: 'Usuário adicionado com sucesso',
      action: <ToastAction altText="Fechar toaster">Fechar</ToastAction>,
    })

    form.reset()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="" placeholder="john@fritz.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input className="" placeholder="Howemouth" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coordinateType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Coordenadas.</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setCoordinateType(value)
                    field.onChange(value)
                  }}
                  defaultValue={field.value}
                  className="flex flex-row"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="geo" id="option-one" />
                    <Label htmlFor="option-one">Geográfica Decimail</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="utm" id="option-two" />
                    <Label htmlFor="option-two">UTM</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {coordinateType === 'geo' && (
          <>
            <FormField
              control={form.control}
              name="lat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input className="" placeholder="-37.3159" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lng"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input className="" placeholder="81.1496" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {coordinateType === 'utm' && (
          <>
            <FormField
              control={form.control}
              name="lat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude UTM</FormLabel>
                  <FormControl>
                    <Input className="" placeholder="7187558.87" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lng"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude UTM</FormLabel>
                  <FormControl>
                    <Input className="" placeholder="679718.29" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zona</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleciona um Fuso da America Latina" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {zoneList.map((zone, index) => (
                        <SelectItem key={index} value={zone.zone}>
                          {zone.zone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button type="submit">Criar</Button>
      </form>
    </Form>
  )
}
