import { useState, useContext } from 'react'
import classNames from 'classnames'
import { ErrorCard, Loading, CardUi, Button } from '..'
import { ModalCard } from '../../container'

import { MyContext } from '../../context/Provider'
import cardStartManage from '../../context/actions/cardStartManage'
import cardEndManage from '../../context/actions/cardEndManage'

import './CardsUi.scss'

const CardsUi = ({ loading, cards, error, manage }) => {
  //Sort keys
  const [sortTitle, setSortTitle] = useState(false)
  const [sortAsc, setSortAsc] = useState(false)

  const [id, setId] = useState(false)

  const { cardsDispatch: dispatch } = useContext(MyContext)

  if (error) return <ErrorCard msg={error} />
  if (loading || !cards) return <Loading />

  const onAddClick = () => {
    cardStartManage({ dispatch })
    setId(false)
  }
  const onModalCancel = () => {
    cardEndManage({ dispatch })
    setId(false)
  }

  const onEdit = (id) => {
    cardStartManage({ dispatch })
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

        {!manage && <Button onClick={onAddClick}>Add</Button>}
      </div>
      {manage && <ModalCard onCancel={onModalCancel} id={id} />}
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
