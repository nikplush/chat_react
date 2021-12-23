import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PATH } from '../../constants/api_paths'

const initialState = {
  userInfo: {},
  error: null,
  status: 'loading'
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('userId')
      return initialState
    }
  },
  extraReducers (builder) {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem('userId', action.payload._id)
        return { ...state, userInfo: action.payload }
      })
      .addCase(loginUser.rejected, (state, action) => ({ ...state, error: action.error.message }))

      .addCase(registrationUser.fulfilled, (state, action) => {
        localStorage.setItem('userId', action.payload._id)
        return { ...state, userInfo: action.payload }
      })
      .addCase(registrationUser.rejected, (state, action) => ({ ...state, error: action.error.message }))

      .addCase(fetchUserById.fulfilled, (state, action) => {
        return { ...state, userInfo: action.payload }
      })
      .addCase(fetchUserById.rejected, (state, action) => ({ ...state, error: action.error.message }))
  }
})

export const loginUser = createAsyncThunk('loginUser/loginUserInfo', async payload => {
  const user = await axios.post(PATH.LOGIN, payload)
  return user.data
})

export const registrationUser = createAsyncThunk('registrationUser/registrationUserUserInfo', async payload => {
  const user = await axios.post(PATH.REGISTRATION, payload)
  return user.data
})

export const fetchUserById = createAsyncThunk('userInfoById/fetchUserInfoById', async payload => {
  const user = await axios.get(PATH.GET_USER_BY_ID, { headers: { userID: payload } })
  return user.data
})

export const { logout } = userInfoSlice.actions

export default userInfoSlice.reducer
