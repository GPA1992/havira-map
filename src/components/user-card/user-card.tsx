import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { IUser } from '@/types/user'

interface Props {
  user: IUser
}

export default function UserCard({ user }: Props) {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle>Nome</CardTitle>
        <CardDescription>{user.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardTitle>Email</CardTitle>
        <CardDescription>{user.email}</CardDescription>
        <CardTitle>Endereço</CardTitle>
        <CardDescription>{user.address.city}</CardDescription>
        <CardDescription>{user.address.street}</CardDescription>
      </CardContent>
    </Card>
  )
}
