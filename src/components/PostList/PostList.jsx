import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin, Pagination, Alert } from 'antd'

import Post from '../Post'
import { fetchPostsList, fetchFavorite, pageChange } from '../../features/posts/postsSlice'

import style from './postList.module.css'

export default function PostList() {
  const dispatch = useDispatch()

  const status = useSelector((state) => state.postsList.status)
  const posts = useSelector((state) => state.postsList.posts)
  const postsCount = useSelector((state) => state.postsList.postsCount)
  const currentPage = useSelector((state) => state.postsList.currentPage)
  const token = useSelector((state) => state.user.user.token)
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const error = useSelector((state) => state.postsList.error)

  useEffect(() => {
    dispatch(fetchPostsList(token))
  }, [token, dispatch])

  const onFavorite = (slug, method) => {
    if (isLoggedIn) {
      const dataForm = {
        resource: `articles/${slug}/favorite`,
        method,
        token,
      }
      dispatch(fetchFavorite(dataForm))
    }
  }

  let content
  if (status === 'loading') {
    content = <Spin />
  } else if (status === 'succeeded' && error === null) {
    content = posts.map((post) => (
      <Post
        key={post.slug}
        slug={post.slug}
        title={post.title}
        tagList={post.tagList}
        favorited={post.favorited}
        favoritesCount={post.favoritesCount}
        authorName={post.author.username}
        avatar={post.author.image}
        createdAt={post.createdAt}
        updatedAt={post.updatedAt}
        description={post.description}
        body={null}
        onFavorite={onFavorite}
      />
    ))
  } else if (status === 'failed' || error) {
    content = <Alert type="error" message={error} />
  }

  return (
    <section className={style.container}>
      <div className={style.content}>{content}</div>
      <div className={style.pagination}>
        <Pagination
          size="small"
          defaultCurrent={currentPage}
          total={postsCount}
          defaultPageSize={10}
          showSizeChanger={false}
          onChange={(page) => {
            dispatch(pageChange(page))
            dispatch(fetchPostsList(token))
          }}
        />
      </div>
    </section>
  )
}
