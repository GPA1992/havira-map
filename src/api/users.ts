import { IUser } from '@/types/user'
import axios from 'axios'

export const getUsers = async (): Promise<IUser[]> => {
  const url = 'https://jsonplaceholder.typicode.com/users'
  const response = await axios.get<IUser[]>(url)
  return response.data
}
