import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import FormHandler from '../features/user/FormHandler'
import UserFormContainer from '../components/UserFormContainer/UserFormContainer'

function Profile() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/sign-in')
    }
  }, [isLoggedIn, navigate])

  const formSet = {
    method: 'PUT',
    resource: 'user',
    fields: [
      { id: 'username', title: 'Username', type: 'text' },
      { id: 'email', title: 'Email address', type: 'email' },
      { id: 'password', title: 'Password', type: 'password' },
      { id: 'image', title: 'Avatar image (url)', type: 'url' },
    ],
    agreement: false,
    button: 'Save',
  }

  return (
    <UserFormContainer title="Edit Profile">
      <FormHandler formSet={formSet} />
    </UserFormContainer>
  )
}
export default Profile
