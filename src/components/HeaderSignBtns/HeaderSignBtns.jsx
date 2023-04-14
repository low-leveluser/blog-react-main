import { Link } from 'react-router-dom'
import classNames from 'classnames'

import style from './headerSignBtns.module.css'

function HeaderSignBtns() {
  return (
    <div>
      <Link to="/sign-in" className={classNames(style.link, style['link-sign-in'])}>
        Sign In
      </Link>
      <Link to="/sign-up" className={classNames(style.link, style['link-sign-up'])}>
        Sign Up
      </Link>
    </div>
  )
}

export default HeaderSignBtns
