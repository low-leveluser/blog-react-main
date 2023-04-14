import style from './userGeneralError.module.css'

function UserGeneralError({ generalError }) {
  return <span className={style.message}>{generalError}</span>
}

export default UserGeneralError
