import { useState } from 'react'
import classNames from 'classnames'
import { ErrorCard, Loading, CardUi, Button } from '..'
import { ModalCard } from '../../container'
import './CardsUi.scss'

const CardsUi = ({ loading, cards, error }) => {
  const [showModal, setShowModal] = useState(false)

  //Sort keys
  const [sortTitle, setSortTitle] = useState(false)
  const [sortAsc, setSortAsc] = useState(false)

  const [id, setId] = useState(false)

  if (error) return <ErrorCard msg={error} />
  if (loading || !cards) return <Loading />

  const onAddClick = () => {
    setShowModal(true)
    setId(false)
  }
  const onModalCancel = () => {
    setShowModal(false)
    setId(false)
  }

  const onEdit = (id) => {
    setShowModal(true)
    setId(id)
  }

  const updateSort = (key) => {
    if (key === sortTitle) {
      setSortAsc(!sortAsc)
    } else {
      setSortTitle(!sortTitle)
    }
  }

  const sorting = (a, b) => {
    const keyA = sortTitle ? a.title : a.created
    const keyB = sortTitle ? b.title : b.created

    if (keyA === keyB) return 0

    if (sortAsc) {
      return keyA > keyB ? 1 : -1
    } else {
      return keyA < keyB ? 1 : -1
    }
  }

  return (
    <div className="cards">
      <div className="header">
        <h4>Cards: {cards.length}</h4>
        <div className="sorting-box">
          <span
            onClick={() => updateSort(true)}
            className={classNames('ml-10 pointer', sortAsc ? 'under' : 'top', {
              bold: sortTitle,
            })}
          >
            Title
          </span>
          <span
            onClick={() => updateSort(false)}
            className={classNames('ml-10 pointer', sortAsc ? 'under' : 'top', {
              bold: !sortTitle,
            })}
          >
            Date
          </span>
        </div>

        {!showModal && <Button onClick={onAddClick}>Add</Button>}
      </div>
      {showModal && <ModalCard onCancel={onModalCancel} id={id} />}
      <ul>
        {cards.sort(sorting).map((card) => {
          return (
            <li key={card.id}>
              <CardUi {...card} onEdit={onEdit} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CardsUi
