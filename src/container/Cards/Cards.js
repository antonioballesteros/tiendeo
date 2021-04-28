import { useContext, useEffect } from 'react'

import { MyContext } from '../../context/Provider'
import cards from '../../context/actions/cards'

import { Login } from '../'
import { CardsUi } from '../../components'

const Cards = () => {
  const {
    cardsDispatch: dispatch,
    authState: {
      auth: { token },
    },
    cardsState: {
      cards: { data, loading, error, manage },
    },
  } = useContext(MyContext)

  useEffect(() => {
    if (token && !loading && !error && !data) {
      cards({ token, dispatch })
    }
  })

  return token ? (
    <CardsUi cards={data} loading={loading} error={error} manage={manage} />
  ) : (
    <Login />
  )
}

export default Cards
