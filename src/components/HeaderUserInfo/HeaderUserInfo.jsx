import { Link } from 'react-router-dom'
import classNames from 'classnames'

import avatarPlug from './avatar.png'
import style from './HeaderUserInfo.module.css'

function HeaderUserInfo({ user, logout }) {
  return (
    <div className={style['user-info']}>
      <Link to="/new-article">
        <div className={style['create-article']}>Create article</div>
      </Link>
      <div>
        <Link to="/profile">
          <span className={style['author-name']}>{user.username}</span>
        </Link>
      </div>
      <div className={style['user-avatar']}>
        <Link to="/profile">
          <img
            src={user.image || avatarPlug}
            alt="user's avatar"
            onError={(e) => {
              e.target.src = avatarPlug
            }}
          />
        </Link>
      </div>
      <button
        type="button"
        className={classNames(style.btn, style['btn-log-out'])}
        onClick={() => {
          logout()
          localStorage.removeItem('user')
        }}
      >
        Log Out
      </button>
    </div>
  )
}

export default HeaderUserInfo
