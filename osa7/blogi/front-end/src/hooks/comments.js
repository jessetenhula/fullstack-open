import { useMutation, useQueryClient } from "@tanstack/react-query"
import commentService from '../services/comments'
import { blogsKey } from "./blogs.js"

export const useCreateComment = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(blogsKey)

  return useMutation({
    mutationFn: commentService.createComment,
    onSuccess: (newComment) => {
      queryClient.setQueryData(blogsKey, blogs.map(blog => blog.id = newComment.id ? { ...blog, comments: blog.comments.concat(newComment)} : blog ))
    }
  })
}