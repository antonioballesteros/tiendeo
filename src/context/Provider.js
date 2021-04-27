import { createContext, useReducer } from 'react'

import auth, { authInitialState } from './reducers/auth'
import cards, { cardsInitialState } from './reducers/cards'

const defaultContext = {}
export const MyContext = createContext(defaultContext)

const Provider = ({ children }) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState)
  const [cardsState, cardsDispatch] = useReducer(cards, cardsInitialState)

  return (
    <MyContext.Provider
      value={{
        authState,
        authDispatch,
        cardsState,
        cardsDispatch,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export default Provider
