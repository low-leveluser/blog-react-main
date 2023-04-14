import classNames from 'classnames'

import style from './userFormfield.module.css'

function UserFormField({ id, type, title, validation, error }) {
  const { name, onBlur, onChange, ref } = validation
  return (
    <label className={style.label} htmlFor={id}>
      <span>{title}</span>
      <input
        className={classNames(style.field, error && style['error-field'])}
        type={type}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
        placeholder={title}
      />
      {error && <span className={style.message}>{error.message || 'Error'}</span>}
    </label>
  )
}

export default UserFormField
