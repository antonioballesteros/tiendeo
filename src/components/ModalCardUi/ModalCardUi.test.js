import { render, screen, fireEvent, within } from '@testing-library/react'
import ModalCardUi from './ModalCardUi'

const returnEmptyCard = () => {
  return {
    id: null,
    title: '',
    description: '',
    imageUrl: null,
  }
}

const returnNotEmptyCard = () => {
  return {
    id: 1,
    title: 'title 1',
    description: 'description 1',
    imageUrl: 'https://test.com/image.jpg',
  }
}

test('ModalCardUi creates card', () => {
  const onCancel = jest.fn(() => {})

  render(<ModalCardUi onCancel={onCancel} card={returnEmptyCard()} />)
  const element = screen.getByText(/New Card/i)
  expect(element).toBeInTheDocument()
})

test('ModalCardUi edits card', () => {
  const onCancel = jest.fn(() => {})

  render(<ModalCardUi onCancel={onCancel} card={returnNotEmptyCard()} />)
  const element = screen.getByText(/Update Card/i)
  expect(element).toBeInTheDocument()
})

test('ModalCardUi Cancel', () => {
  const onCancel = jest.fn(() => {})
  render(<ModalCardUi onCancel={onCancel} card={returnEmptyCard()} />)
  fireEvent.click(screen.getByText(/Cancel/i))
  expect(onCancel).toHaveBeenCalledTimes(1)
})

test('ModalCardUi Invalid Required', () => {
  const onCancel = jest.fn(() => {})
  const onSubmit = jest.fn(() => {})
  render(
    <ModalCardUi
      onCancel={onCancel}
      onSubmit={onSubmit}
      card={returnEmptyCard()}
    />
  )

  fireEvent.click(screen.getByText(/Create/i))
  expect(onSubmit).toHaveBeenCalledTimes(0)

  const title = screen.getByPlaceholderText(/title/i)
  fireEvent.change(title, { target: { value: 'Title' } })
  expect(title.value).toBe('Title')

  fireEvent.click(screen.getByText(/Create/i))
  expect(onSubmit).toHaveBeenCalledTimes(0)

  fireEvent.change(title, { target: { value: '' } })
  expect(title.value).toBe('')

  const description = screen.getByPlaceholderText(/description/i)
  fireEvent.change(description, { target: { value: 'Description' } })
  expect(description.value).toBe('Description')

  fireEvent.click(screen.getByText(/Create/i))
  expect(onSubmit).toHaveBeenCalledTimes(0)
})

test('ModalCardUi Valid Form', () => {
  const onCancel = jest.fn(() => {})
  const onSubmit = jest.fn(() => {})
  render(
    <ModalCardUi
      onCancel={onCancel}
      onSubmit={onSubmit}
      card={returnEmptyCard()}
    />
  )

  const title = screen.getByPlaceholderText(/title/i)
  fireEvent.change(title, { target: { value: 'Title' } })
  expect(title.value).toBe('Title')

  const description = screen.getByPlaceholderText(/description/i)
  fireEvent.change(description, { target: { value: 'Description' } })
  expect(description.value).toBe('Description')

  fireEvent.click(screen.getByText(/Create/i))
  expect(onSubmit).toHaveBeenCalledTimes(1)
})

test('ModalCardUi Check buttons for new cards', () => {
  const onCancel = jest.fn(() => {})
  render(<ModalCardUi onCancel={onCancel} card={returnEmptyCard()} />)

  const buttons = screen.getByTestId('options')

  const create = within(buttons).queryByText(/Create/i)
  expect(create).toBeInTheDocument()

  const deleteElement = within(buttons).queryByText(/Delete/i)
  expect(deleteElement).not.toBeInTheDocument()

  const update = within(buttons).queryByText(/Update/i)
  expect(update).not.toBeInTheDocument()
})

test('ModalCardUi Check buttons for valid cards', () => {
  const onCancel = jest.fn(() => {})
  render(<ModalCardUi onCancel={onCancel} card={returnNotEmptyCard()} />)

  const buttons = screen.getByTestId('options')

  const create = within(buttons).queryByText(/Create/i)
  expect(create).not.toBeInTheDocument()

  const deleteElement = within(buttons).queryByText(/Delete/i)
  expect(deleteElement).toBeInTheDocument()

  const update = within(buttons).queryByText(/Update/i)
  expect(update).toBeInTheDocument()
})
