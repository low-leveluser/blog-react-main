import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import serviceArticle from '../../services/serviceArticle'

export const fetchArticle = createAsyncThunk('article/fetchArticle', async (dataForm) => serviceArticle(dataForm))

const initialState = {
  status: 'idle',
  article: {
    tagList: [null],
  },
  error: null,
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.article = action.payload.article
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default articleSlice.reducer
