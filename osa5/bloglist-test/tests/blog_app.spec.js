const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Jesse',
        username: 'jesse',
        password: 'passwd'
      }
    })
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Toinen',
        username: 'toinen',
        password: 'salasana'
      }
    }) 

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await helper.loginWith(page, 'jesse', 'passwd')

      await expect(page.getByText('Jesse logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await helper.loginWith(page, 'jesse', 'password')

      await expect(page.getByText('Jesse logged in')).not.toBeVisible()
      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await helper.loginWith(page, 'jesse', 'passwd')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await helper.createBlog(page, {title: 'uusi blogi', author: 'Joku', url: 'www.sivusto.blog'})

      await expect(page.getByText('uusi blogi', { exact: true })).toBeVisible()
      await expect(page.getByText('Joku', { exact: true })).toBeVisible()
      await expect(page.getByRole('button', { name: 'show', exact: true })).toBeVisible()
    })

    describe('after creating a new blog', () => {
      beforeEach(async ({ page }) => {
        await helper.createBlog(page, {title: 'uusi blogi', author: 'Joku', url: 'www.sivusto.blog'})
      })

      test('the blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'show', exact: true }).click()
        await page.getByRole('button', { name: 'like', exact: true }).click()

        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('the blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'show', exact: true }).click()
        const removeButton = page.getByRole('button', { name: 'remove', exact: true })
        await expect(removeButton).toBeVisible()

        page.on('dialog', async dialog => await dialog.accept());
        await removeButton.click()

        await expect(page.getByText('deleted blog "uusi blogi" by author Joku')).toBeVisible()
        await expect(page.getByText('uusi blogi', { exact: true })).not.toBeVisible()
      })
    })

    test('blog can only be removed by the user who created it', async ({ page }) => {
      await helper.createBlog(page, { title: 'jessen blogi', author: 'Jesse', url: 'www.sivusto.blog'})

      await page.getByRole('button', { name: 'logout' }).click()
      await helper.loginWith(page, 'toinen', 'salasana')

      await page.getByRole('button', { name: 'show', exact: true }).click()
      await expect(page.getByRole('button', { name: 'remove', exact: true })).not.toBeVisible()
    })

    test('blogs are ordered properly', async ({ page }) => {
      await helper.createBlog(page, { title: 'blogi 1', author: 'Joku', url: 'www.sivusto.blog'})
      await helper.createBlog(page, { title: 'blogi 2', author: 'Joku', url: 'www.sivusto.blog'})
      await helper.createBlog(page, { title: 'blogi 3', author: 'Joku', url: 'www.sivusto.blog'})

      const showButtons = await page.getByRole('button', { name: 'show', exact: true }).all()
      for(let i = 0; i < showButtons.length; i++) {
        await showButtons[0].click()
      }

      await page.getByRole('button', { name: 'like', exact: true }).first().click()
      await page.getByText('likes 1').waitFor()
      await page.getByRole('button', { name: 'like', exact: true }).first().click()
      await page.getByText('likes 2').waitFor()
      await page.getByRole('button', { name: 'like', exact: true }).last().click()
      await page.getByText('likes 1').waitFor()

      const likes = page.getByText(/likes \d/)
      const likeTexts = await likes.evaluateAll(list => list.map(element => element.textContent));
      
      expect(likeTexts).toEqual(likeTexts.toSorted().reverse())
    })
  })
})