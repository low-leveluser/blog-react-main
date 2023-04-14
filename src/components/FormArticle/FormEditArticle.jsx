import { useState } from 'react'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'

import style from './formNewArticle.module.css'

export default function FormEditArticle({ pageTitle, article, onSubmit }) {
  const { title, description, body: text, tagList } = article

  const [tagValues, setTagValues] = useState(tagList.length === 0 ? [''] : tagList)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    defaultValues: {
      title,
      description,
      text,
    },
    mode: 'onTouched',
  })

  console.log('isSubmitting', isSubmitted)

  const createTagInput = (index) => (
    <input
      className={classNames(style['text-input'], style.tag)}
      type="text"
      placeholder="Tag"
      value={tagValues[index]}
      onChange={(event) => setTagValues((tags) => tags.map((tag, idx) => (idx === index ? event.target.value : tag)))}
    />
  )

  const createTagControls = (number) => {
    const tagControls = []

    for (let i = 0; i < number; i++) {
      const btnAddTag = (
        <button type="button" className={style['btn-add-tag']} onClick={() => setTagValues([...tagValues, ''])}>
          Add tag
        </button>
      )
      const btnDeleteTag = (
        <button
          type="button"
          className={style['btn-delete-tag']}
          onClick={() => setTagValues([...tagValues.slice(0, i), ...tagValues.slice(i + 1)])}
        >
          Delete
        </button>
      )
      const tagControl = (
        <div key={i}>
          {createTagInput(i)}
          {(i > 0 || number > 1) && btnDeleteTag}
          {i === number - 1 && btnAddTag}
        </div>
      )
      tagControls.push(tagControl)
    }

    return tagControls
  }
  return (
    <div className={style['new-article-container']}>
      <h3 className={style.title}>{pageTitle}</h3>
      <form className={style.form} onSubmit={handleSubmit((data) => onSubmit(data, tagValues))}>
        <label htmlFor="title">
          <span className={style['text-label']}>Title</span>
          <input
            className={classNames(style['text-input'], { [style['error-input']]: errors.title })}
            type="text"
            id="title"
            placeholder="Title"
            {...register('title', {
              required: 'This field is required',
            })}
          />
        </label>
        {errors.title && <span className={style.message}>{errors.title.message || 'Error'}</span>}

        <label htmlFor="description">
          <span className={style['text-label']}>Short description</span>
          <input
            className={classNames(style['text-input'], { [style['error-input']]: errors.description })}
            type="text"
            id="description"
            placeholder="Short description"
            {...register('description', {
              required: 'This field is required',
            })}
          />
        </label>
        {errors.description && <span className={style.message}>{errors.description.message || 'Error'}</span>}

        <label htmlFor="text">
          <span className={style['text-label']}>Text</span>
          <textarea
            className={classNames(style['text-input'], { [style['error-input']]: errors.text })}
            id="text"
            placeholder="Text"
            {...register('text', {
              required: 'This field is required',
            })}
          />
        </label>
        {errors.text && <span className={style.message}>{errors.text.message || 'Error'}</span>}

        <span className={style['text-label']}>Tags</span>
        {createTagControls(tagValues.length)}
        <button
          className={classNames(style.btn, !isValid && style['btn-disable'], isSubmitted && style['btn-disable'])}
          type="submit"
          disabled={!isValid || isSubmitted}
        >
          Send
        </button>
      </form>
    </div>
  )
}
