import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

export const blogsKey = ['blogs']
export const userskey = ['users']

export const useGetBlogs = () => {
  return useQuery({
    queryKey: blogsKey,
    queryFn: blogService.getAll
  })
}

export const useCreateBlog = () =>{
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(blogsKey)

  return useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (newBlog) => {
      queryClient.setQueryData(blogsKey, blogs.concat(newBlog))
      queryClient.invalidateQueries(userskey)
    }
  })
}

export const useUpdateBlog = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(blogsKey)

  return useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(
        blogsKey,
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    }
  })
}

export const useDeleteBlog = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(blogsKey)

  return  useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (deletedBlog) => {
      queryClient.setQueryData(
        blogsKey,
        blogs.filter(blog => blog.id !== deletedBlog.id)
      )
    }
  })
}