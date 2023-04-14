import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import style from './favorite.module.css'
import heart from './heart.svg'
import redHeart from './redHeart.svg'

function Favorite({ favorited, favoritesCount, onFavorite, slug }) {
  const [fav, setFav] = useState(favorited)
  const [favCount, setFavCount] = useState(favoritesCount)

  const favReply = useSelector((state) => state.postsList.favorite)

  useEffect(() => {
    setFav(favorited)
  }, [favorited])

  useEffect(() => {
    if (slug === favReply.slug) {
      setFav(favReply.favorited)
      setFavCount(favReply.favoritesCount)
    }
  }, [favReply.favorited, favReply.favoritesCount, favReply.slug, slug])

  const heartSrc = fav ? redHeart : heart
  const method = fav ? 'DELETE' : 'POST'
  return (
    <div className={style.favoritesCount}>
      <button type="button" onClick={() => onFavorite(slug, method)}>
        <img src={heartSrc} alt="favorite count" />
      </button>
      <span>{favCount}</span>
    </div>
  )
}

export default Favorite
