import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import NewArticle from '../features/article/NewArticle'

function CreateNewArticle() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/sign-in')
    }
  }, [isLoggedIn, navigate])

  return <NewArticle />
}

export default CreateNewArticle
