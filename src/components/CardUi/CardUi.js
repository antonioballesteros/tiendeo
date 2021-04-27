import { Button } from '../'

import './CardUi.scss'

import defaultImg from '../../assets/img/default-img.jpg'

const CardUi = ({ id, title, description, imageUrl, onEdit }) => {
  const checkUrl = (imageUrl) => {
    try {
      const parseUrl = new URL(imageUrl)
      return parseUrl.pathname
    } catch (e) {}
    return '/'
  }

  const img = checkUrl(imageUrl) === '/' ? defaultImg : imageUrl

  return (
    <div className="card">
      <div
        className="head"
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        <h3 data-testid="title">{title}</h3>
        {id && onEdit && (
          <Button className="ml-auto mr-10 mb-10" onClick={() => onEdit(id)}>
            Edit
          </Button>
        )}
      </div>
      <h4>{description}</h4>
    </div>
  )
}
export default CardUi
