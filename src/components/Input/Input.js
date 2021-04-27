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

export default Input
