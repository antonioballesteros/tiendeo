import PropTypes from 'prop-types'
import './Input.scss'
import classNames from 'classnames'

const Input = ({
  className,
  required,
  name,
  value,
  placeholder,
  onChange,
  disabled,
  type,
}) => {
  return (
    <input
      className={classNames('input', className)}
      required={required}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      type={type}
      autoComplete="off"
    />
  )
}

Input.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf([
    'button',
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]),
}

Input.defaultProps = {
  type: 'text',
}

export default Input
