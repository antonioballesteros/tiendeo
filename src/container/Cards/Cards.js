import { useContext, useEffect } from 'react'

import { MyContext } from '../../context/Provider'
import cards from '../../context/actions/cards'

import { Login } from '../'
import { CardsUi } from '../../components'

const Cards = () => {
  const {
    cardsDispatch,
    authState: {
      auth: { token },
    },
    cardsState: {
      cards: { data, loading, error },
    },
  } = useContext(MyContext)

  useEffect(() => {
    if (token && !loading && !error && !data) {
      cards(token, cardsDispatch)
    }
  })

  return token ? (
    <CardsUi cards={data} loading={loading} error={error} />
  ) : (
    <Login />
  )
}

export default Cards
