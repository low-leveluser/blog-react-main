import { Checkbox } from 'antd'

import style from './userFormAgreement.module.css'

function UserFormAgreement({ field, errorMessage }) {
  const {
    field: { onChange, value, name },
  } = field
  return (
    <div className={style.agreement}>
      <Checkbox onChange={onChange} checked={value} name={name} defaultChecked className="checkbox">
        {errorMessage ? (
          <span className={style.message}>{errorMessage}</span>
        ) : (
          'I agree to the processing of my personal information'
        )}
      </Checkbox>
    </div>
  )
}

export default UserFormAgreement
