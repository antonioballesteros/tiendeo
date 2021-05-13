import classNames from 'classnames'
import PropTypes from 'prop-types'

import './Button.scss'

const Button = ({ children, onClick, className, type }) => {
  return (
    <button
      onClick={onClick}
      className={classNames('button', className)}
      type={type}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
}

Button.defaultProps = {
  type: 'button',
}

export default Button
