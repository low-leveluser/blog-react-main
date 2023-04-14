import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import FormEditArticle from '../../components/FormArticle'

import { fetchArticle } from './articleSlice'

function EditArticle() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = useSelector((state) => state.user.user.token)
  const article = useSelector((state) => state.article.article)
  const { slug } = article

  const onSubmit = (data, tagValues = []) => {
    const dataForm = {
      resource: `articles/${slug}`,
      method: 'PUT',
      token,
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: tagValues,
      },
      redirect: () => navigate(`/articles/${slug}`),
    }
    dispatch(fetchArticle(dataForm))
  }

  return <FormEditArticle pageTitle="Edit article" article={article} onSubmit={onSubmit} />
}

export default EditArticle
