import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PATH } from '../../constans/api_paths'

const initialState = {
  userInfo: {},
  error: null
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers (builder) {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => ({ ...state, userInfo: action.payload }))
      .addCase(fetchUser.rejected, (state, action) => ({ ...state, error: action.error.message }))
  }
})

export const fetchUser = createAsyncThunk('userInfo/fetchUserInfo', async payload => {
  const user = await axios.post(PATH.LOGIN, payload)
  return user.data
})

export const { login } = userInfoSlice.actions

export default userInfoSlice.reducer
