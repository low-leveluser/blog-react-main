import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import EditArticle from '../features/article/EditArticle'

function EditPost() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const username = useSelector((state) => state.user?.user?.username || null)
  const authorname = useSelector((state) => state.article?.article?.author?.username || null)
  const { slug } = useParams()
  const navigate = useNavigate()

  console.log('cons', isLoggedIn, username, authorname, slug)

  useEffect(() => {
    if (!isLoggedIn) {
      console.log(isLoggedIn)
      navigate('/sign-in')
    }
    if (username !== authorname) {
      console.log(username, authorname)
      navigate(`/articles/${slug}`)
    }
  }, [isLoggedIn, navigate, authorname, slug, username])

  return <EditArticle />
}

export default EditPost
