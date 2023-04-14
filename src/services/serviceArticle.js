export default async function serviceArticle(dataForm) {
  const data =
    JSON.stringify({
      article: dataForm.article,
    }) || null

  const { redirect } = dataForm

  const token = dataForm.token ? `Token ${dataForm.token}` : null
  const method = dataForm.method || 'POST'

  if (method !== 'GET') {
    try {
      const res = await fetch(`https://blog.kata.academy/api/${dataForm.resource}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: data,
      })
      if (res.ok) {
        const response = await res.json()
        if (redirect) {
          redirect(`/articles/${response.article.slug}`)
        }
        return response
      }
      throw new Error(`${res.status}`)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  try {
    const res = await fetch(`https://blog.kata.academy/api/${dataForm.resource}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
    if (res.ok) {
      const response = await res.json()
      return response
    }
    throw new Error(`${res.status}`)
  } catch (err) {
    return Promise.reject(err)
  }
}
