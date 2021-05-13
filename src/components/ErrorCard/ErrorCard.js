import { useState } from 'react'
import PropTypes from 'prop-types'
import './ErrorCard.scss'

const ErrorCard = ({ msg }) => {
  const [showError, setShowError] = useState(true)
  const onClick = () => {
    setShowError(false)
  }
  return showError ? (
    <div className="errorCard" onClick={onClick}>
      <h3>Problem with api:</h3>
      <h4>{msg}</h4>
    </div>
  ) : null
}

ErrorCard.propTypes = {
  msg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

export default ErrorCard
