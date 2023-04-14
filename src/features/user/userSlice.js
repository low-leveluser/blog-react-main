import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

class ValidationError extends Error {
  constructor(message, obj = {}) {
    super(message)
    this.name = 'ValidationError'
    this.response = obj
  }
}

export const fetchServiceUser = createAsyncThunk(
  'user/fetchServiceUser',
  async (dataForm, { getState, rejectWithValue }) => {
    const data = JSON.stringify({
      user: dataForm.user,
    })

    const { callback } = dataForm

    let result

    try {
      const res = await fetch(`https://blog.kata.academy/api/${dataForm.resource}`, {
        method: dataForm.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${getState().user.user.token}`,
        },
        body: data,
      })

      result = await res.json()

      if (result && !res.ok) {
        throw new ValidationError(res.statusText, result)
      }

      localStorage.setItem('user', JSON.stringify(result))
      callback()
      return result
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      token: null,
    },
    isLoggedIn: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    getUserLocal(state, action) {
      if (action.payload.user.token) {
        state.user = action.payload.user
        state.isLoggedIn = true
      }
    },
    logOut(state) {
      state.isLoggedIn = false
      state.user = {}
    },
    errorReset(state) {
      state.error = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchServiceUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchServiceUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isLoggedIn = true
        state.user = action.payload.user
        state.error = null
      })
      .addCase(fetchServiceUser.rejected, (state, action) => {
        state.status = 'failed'
        if (action.payload) {
          state.error = action.payload.errors
        } else {
          state.error = action.error.message
        }
      })
  },
})

export const { getUserLocal, logOut, errorReset } = userSlice.actions

export default userSlice.reducer
