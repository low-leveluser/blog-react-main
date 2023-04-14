import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import UserFormField from '../../components/UserFormField/UserFormField'
import UserFormAgreement from '../../components/UserFormAgreement/UserFormAgreement'
import UserFormBtn from '../../components/UserFormBtn/UserFormBtn'
import UserGeneralError from '../../components/UserGeneralError/UserGeneralError'
import validationRulesMaker from '../../helpers/validationRulesMaker'

import { fetchServiceUser, errorReset } from './userSlice'

function FormHandler({ formSet }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(errorReset())
  }, [dispatch])

  const [generalError, setGeneralError] = useState(null)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
    control,
  } = useForm({ mode: 'onTouched' })

  const onSubmit = (data) => {
    const dataForm = {
      method: formSet.method,
      resource: formSet.resource,
      user: data,
      callback: () => {
        navigate('/')
      },
    }
    dispatch(fetchServiceUser(dataForm))
  }

  const validationRules = validationRulesMaker(watch)

  const serverErrors = useSelector((state) => state.user.error)

  useEffect(() => {
    if (typeof serverErrors === 'object' && serverErrors !== null) {
      Object.keys(serverErrors).forEach((key) => {
        if (key === 'username' || key === 'email' || key === 'password') {
          setError(key, { message: serverErrors[key] })
        } else {
          setGeneralError(`${key} ${serverErrors[key]}`)
        }
      })
    }
    if (typeof serverErrors === 'string') {
      setGeneralError(serverErrors)
    }
    if (serverErrors === null) {
      setGeneralError(null)
    }
  }, [serverErrors, setError, generalError, dispatch])

  const fieldsArr = formSet.fields.map((field) => {
    const { title, id, type } = field
    const validation = register(id, validationRules[id])
    return <UserFormField key={id} title={title} id={id} type={type} validation={validation} error={errors[id]} />
  })

  const agreement = (
    <Controller
      name="agreement"
      control={control}
      render={(field) => <UserFormAgreement field={field} errorMessage={errors?.agreement?.message} />}
      rules={{ required: 'Confirm agreement' }}
      defaultValue
    />
  )

  return (
    <div>
      <UserGeneralError generalError={generalError} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {fieldsArr}
        {formSet.agreement && agreement}
        <UserFormBtn title={formSet.button} isValid={isValid} />
      </form>
    </div>
  )
}

export default FormHandler
