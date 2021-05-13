import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

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

Provider.propTypes = {
  children: PropTypes.object.isRequired,
}

export default Provider
