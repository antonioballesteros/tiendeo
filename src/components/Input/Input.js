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
    />
  )
}

export default Input
