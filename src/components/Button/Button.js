import classNames from 'classnames'

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

export default Button
