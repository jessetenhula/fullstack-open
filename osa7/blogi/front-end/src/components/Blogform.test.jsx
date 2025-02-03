import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import BlogForm from './BlogForm'

test('bruhge', async () => {

  const createBlog = vi.fn()

  const { container } = render(<BlogForm createBlog={createBlog}/>)

  const testUser = userEvent.setup()

  const titleField = container.querySelector('input[name="title"]')
  const authorField = container.querySelector('input[name="author"]')
  const urlField = container.querySelector('input[name="url"]')

  await testUser.type(titleField, 'new blog title')
  await testUser.type(authorField, 'some author')
  await testUser.type(urlField, 'www.blog.com')

  const submitButton = screen.getByText('create')
  await testUser.click(submitButton)

  expect(createBlog.mock.calls[0][0]).toEqual({ title: 'new blog title', author: 'some author', url: 'www.blog.com' })
  expect(createBlog).toBeCalledTimes(1)
})