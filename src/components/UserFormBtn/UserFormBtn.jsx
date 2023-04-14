import classNames from 'classnames'

import style from './userFromBtn.module.css'

function UserFormBtn({ title, isValid }) {
  return (
    <button className={classNames(style.btn, !isValid && style['btn-disable'])} disabled={!isValid} type="submit">
      {title}
    </button>
  )
}

export default UserFormBtn
