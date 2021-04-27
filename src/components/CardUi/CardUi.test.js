import { render, screen, fireEvent } from '@testing-library/react'
import CardUi from './CardUi'

const createCard = () => {
  return {
    id: 1,
    userId: 1,
    created: '2021-01-01',
    title: 'AA',
    description: 'desc1',
    imageUrl: 'https://i.picsum.photos/id/941/200/300.jpg',
  }
}
test('CardUi', () => {
  const card = createCard()
  render(<CardUi {...card} />)
  const title = screen.getByText(card.title)
  expect(title).toBeInTheDocument()
  const desc = screen.getByText(card.description)
  expect(desc).toBeInTheDocument()

  expect(screen.getByTestId('background')).toHaveStyle(
    `background-image: url(${card.imageUrl})`
  )
})

test('CardUi default image', () => {
  render(<CardUi />)
  const defaultImageUrl = 'default-img.jpg'
  expect(screen.getByTestId('background')).toHaveStyle(
    `background-image: url(${defaultImageUrl})`
  )
})

test('CardUi: allow edit cards', () => {
  const card = createCard()
  const onEdit = jest.fn(() => {})
  render(<CardUi {...card} onEdit={onEdit} />)

  const element = screen.getByRole('button')
  expect(element).toBeInTheDocument()
  fireEvent.click(element)
  expect(onEdit).toHaveBeenCalledTimes(1)
})

test('CardUi: disallow edit cards, no onEdit defined', () => {
  const card = createCard()

  render(<CardUi {...card} />)

  const element = screen.queryByRole('button')
  expect(element).not.toBeInTheDocument()
})

test('CardUi: disallow edit cards when new card', () => {
  const onEdit = jest.fn(() => {})
  render(<CardUi onEdit={onEdit} />)

  const element = screen.queryByRole('button')
  expect(element).not.toBeInTheDocument()
})
