import { render, waitFor, screen } from '@testing-library/react'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Provider from '../../context/Provider'
import Cards from './Cards'

const baseUrl = process.env.REACT_APP_API ? process.env.REACT_APP_API : ''

const server = setupServer(
  rest.get(`${baseUrl}/cards`, (req, res, ctx) => {
    return res(ctx.json([]))
  })
)

beforeAll(() => server.listen())
beforeEach(() => localStorage.setItem('token', '123-456-789'))
afterEach(() => {
  localStorage.removeItem('token')
  server.resetHandlers()
})
afterAll(() => server.close())

test('Cards load page with 0 cards', async () => {
  render(
    <Provider>
      <Cards />
    </Provider>
  )

  await waitFor(() => {
    const element = screen.queryByText(/Cards: 0/i)
    expect(element).toBeInTheDocument()
  })
})

test('Cards error', async () => {
  server.use(
    rest.get(`${baseUrl}/cards`, (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(
    <Provider>
      <Cards />
    </Provider>
  )

  await waitFor(() => {
    const element = screen.queryByText(/Problem with api/i)
    expect(element).toBeInTheDocument()
  })
})

test('Cards load page with 2 cards', async () => {
  server.use(
    rest.get(`${baseUrl}/cards`, (req, res, ctx) => {
      return res(ctx.json([{ id: 1 }, { id: 2 }]))
    })
  )

  render(
    <Provider>
      <Cards />
    </Provider>
  )

  await waitFor(() => {
    const element = screen.queryByText(/Cards: 2/i)
    expect(element).toBeInTheDocument()
  })
})
