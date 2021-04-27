import { render, screen, fireEvent } from '@testing-library/react'
import ErrorCard from './ErrorCard'

test('ErrorCard', () => {
  render(<ErrorCard msg="very bad error" />)
  const element = screen.getByText(/very bad error/i)
  expect(element).toBeInTheDocument()
})

test('ErrorCard Clicked', () => {
  render(<ErrorCard msg="very bad error" />)
  fireEvent.click(screen.getByText(/very bad error/i))

  const element = screen.queryByText(/very bad error/i)
  expect(element).not.toBeInTheDocument()
})
