import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import Blog from './Blog'

describe('Blog component', () => {
  test('renders blog title by default', () => {
    const blog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'www.testurl.com',
      user: {
        username: 'Test user'
      }
    }

    const user = {
      username: 'Test user'
    }

    render(<Blog blog={blog} user={user} />)

    const element = screen.getByText('Test blog')
  })

  test('renders blog details after clicking "show" button', async () => {
    const blog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'www.testurl.com',
      user: {
        name: 'Test user'
      },
      likes: 1
    }

    const user = {
      username: 'Test user'
    }

    render(<Blog blog={blog} user={user} />)

    const testUser = userEvent.setup()

    const showButton = screen.getByRole('button')
    await testUser.click(showButton)

    const url = screen.getByText('www.testurl.com', { exact: false })
    const likes = screen.getByText('likes 1', { exact: false })
    const blogUsername = screen.getByText('Test user', { exact: false })
  })

  test('clicking like button twice calls callback function twice', async () => {
    const blog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'www.testurl.com',
      user: {
        name: 'Test user'
      },
      likes: 1
    }

    const user = {
      username: 'Test user'
    }

    const mockHandler = vi.fn()

    const { container } = render(<Blog blog={blog} user={user} handleLikeClick={mockHandler}/>)

    const testUser = userEvent.setup()

    const showButton = screen.getByRole('button')
    await testUser.click(showButton)

    const likeButton = container.querySelector('.blog-like-button')
    await testUser.click(likeButton)
    await testUser.click(likeButton)

    expect(mockHandler).toHaveBeenCalledTimes(2)
  })
})