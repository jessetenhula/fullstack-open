import { useQuery } from "@tanstack/react-query"
import usersService from '../services/users'

const usersKey = ['users']

export const useGetUsers = () => {
  return useQuery({
    queryKey: usersKey,
    queryFn: usersService.getAll
  })
}