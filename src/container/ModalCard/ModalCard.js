import { useContext } from 'react'
import PropTypes from 'prop-types'

import { MyContext } from '../../context/Provider'
import addCard from '../../context/actions/addCard'
import updateCard from '../../context/actions/updateCard'
import deleteCard from '../../context/actions/deleteCard'

import { ModalCardUi } from '../../components'

const ModalCard = ({ id, onCancel }) => {
  const {
    cardsDispatch,
    authState: {
      auth: { token },
    },
    cardsState: {
      cards: { data: cardsData },
      addCard: { updating: addCardUpdating, error: addCardError },
      updateCard: { updating: updateCardUpdating, error: updateCardError },
      deleteCard: { updating: deleteCardUpdating, error: deleteCardError },
    },
  } = useContext(MyContext)

  const onSubmit = (data) => {
    if (data.id) {
      updateCard(token, data, cardsDispatch)
    } else {
      addCard(token, data, cardsDispatch)
    }
    onCancel()
  }

  const onDelete = (data) => {
    deleteCard(token, data, cardsDispatch)
    onCancel()
  }

  const updating = addCardUpdating || updateCardUpdating || deleteCardUpdating
  const error = addCardError || updateCardError || deleteCardError

  const card = id
    ? cardsData.find((card) => card.id === id)
    : {
        id: null,
        title: '',
        description: '',
        imageUrl: null,
      }

  return (
    <ModalCardUi
      onSubmit={onSubmit}
      onDelete={onDelete}
      onCancel={onCancel}
      card={card}
      updating={updating}
      error={error}
    />
  )
}
ModalCard.propTypes = {
  onCancel: PropTypes.func.isRequired,
}

export default ModalCard
