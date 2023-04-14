import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import FormEditArticle from '../../components/FormArticle'

import { fetchArticle } from './articleSlice'

function EditArticle() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const article = { title: '', description: '', body: '', tagList: [''] }

  const token = useSelector((state) => state.user.user.token)

  const onSubmit = (data, tagValues = []) => {
    for (let i = 0; i < tagValues.length; i++) {
      if (tagValues[i] === '') {
        tagValues.splice(i, 1)
      }
    }
    const dataForm = {
      resource: 'articles',
      method: 'POST',
      token,
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: tagValues,
      },
      redirect: (path) => navigate(path),
    }
    dispatch(fetchArticle(dataForm))
  }

  return <FormEditArticle pageTitle="Edit article" article={article} onSubmit={onSubmit} />
}

export default EditArticle
