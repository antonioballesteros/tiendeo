import { render, screen } from '@testing-library/react'
import CardsUi from './CardsUi'

const create5Cards = () => {
  return [
    {
      id: 1,
      userId: 1,
      created: '2021-01-01',
      title: 'AA',
      description: 'desc1',
      image: null,
    },
    {
      id: 2,
      userId: 1,
      created: '2021-01-02',
      title: 'BB',
      description: 'desc2',
      image: null,
    },
    {
      id: 3,
      userId: 1,
      created: '2021-01-03',
      title: 'ZZ',
      description: 'desc3',
      image: null,
    },
    {
      id: 4,
      userId: 1,
      created: '2021-01-04',
      title: 'CC',
      description: 'desc4',
      image: null,
    },
    {
      id: 5,
      userId: 1,
      created: '2021-01-05',
      title: 'MM',
      description: 'desc5',
      image: null,
    },
  ]
}
test('CardsUi not yet loaded', () => {
  render(<CardsUi cards={false} loading={false} error={false} />)
  const element = screen.getByText(/loading/i)
  expect(element).toBeInTheDocument()
})

test('CardsUi Loading', () => {
  render(<CardsUi cards={[]} loading={true} error={false} />)
  const element = screen.getByText(/loading/i)
  expect(element).toBeInTheDocument()
})

test('CardsUi error', () => {
  render(<CardsUi cards={create5Cards()} loading={false} error={true} />)
  const element = screen.getByText(/Problem with api/i)
  expect(element).toBeInTheDocument()

  const element2 = screen.queryByText(/Cards:/i)
  expect(element2).not.toBeInTheDocument()
})

test('CardsUi received', () => {
  render(<CardsUi cards={create5Cards()} loading={false} error={false} />)
  const element = screen.getByText(/Cards: 5/i)
  expect(element).toBeInTheDocument()
})
