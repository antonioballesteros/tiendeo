import { render, screen } from '@testing-library/react'
import App from './App'

test('App', () => {
  render(<App />)
  const element = screen.getByText(/AntonioApp/i)
  expect(element).toBeInTheDocument()
})
