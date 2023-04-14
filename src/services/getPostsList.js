export default async function getPostList(token = null, currentPage = 1) {
  const offset = (currentPage - 1) * 10

  try {
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=10&offset=${offset}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    if (response.ok) {
      return await response.json()
    }
    throw new Error(`${response.status}`)
  } catch (err) {
    return Promise.reject(err)
  }
}
