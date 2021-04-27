import { useState } from 'react'
import PropTypes from 'prop-types'

import { CardUi, ErrorCard, Button, Input } from '../'
import './ModalCardUi.scss'

const ModalCardUi = ({
  onCancel,
  onSubmit,
  onDelete,
  card,
  updating,
  error,
}) => {
  const [title, setTitle] = useState(card.title)
  const [description, setDescrition] = useState(card.description)
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(card.imageUrl)

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const onChangeDescription = (e) => {
    setDescrition(e.target.value)
  }
  const onChangeImage = (e) => {
    if (e.target.files.length) {
      setImage(e.target.files[0])
      setImageUrl(URL.createObjectURL(e.target.files[0]))
    } else {
      setImage(null)
      setImageUrl(null)
    }
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    if (title && description) {
      onSubmit({
        id: card.id,
        title,
        description,
        image,
      })
    }
  }

  const onClickDelete = (e) => {
    e.preventDefault()

    if (card.id) {
      onDelete(card)
    }
  }

  return (
    <div className="modal-card">
      {!!error && <ErrorCard msg={error} />}

      <h2>{card.id ? 'Update Card' : 'New Card'}</h2>
      <form onSubmit={onSubmitForm}>
        <Input
          required
          name="title"
          value={title}
          placeholder="Title"
          onChange={onChangeTitle}
          disabled={updating}
        />
        <Input
          required
          name="description"
          value={description}
          placeholder="Description"
          onChange={onChangeDescription}
          disabled={updating}
        />
        {!card.id && (
          <Input
            name="image"
            type="file"
            onChange={onChangeImage}
            disabled={updating}
          />
        )}

        <h3>Preview Card</h3>
        <CardUi title={title} description={description} imageUrl={imageUrl} />
        <div className="options" data-testid="options">
          <Button
            className="mr-auto"
            type="reset"
            onClick={onCancel}
            disabled={updating}
          >
            Cancel
          </Button>
          {!!card.id && (
            <Button
              className="mr-10"
              onClick={onClickDelete}
              disabled={updating}
            >
              Delete
            </Button>
          )}
          <Button className="mr-10" type="submit" disabled={updating}>
            {card.id ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  )
}
ModalCardUi.propTypes = {
  onCancel: PropTypes.func.isRequired,
}

export default ModalCardUi
