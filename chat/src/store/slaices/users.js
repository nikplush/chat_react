import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { PATH } from '../../constans/api_paths'

const initialState = {
  users: [],
  error: null
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    changeUserStatus: (state, action) => {
      const targetUserIndex = state.users.findIndex(item => item._id === action.payload.id)
      if (targetUserIndex > -1) {
        const targetUserInfo = state.users[targetUserIndex]
        state.users[targetUserIndex] = { ...targetUserInfo, online: action.payload.isOnline }
      }
    },
    addUser: (state, action) => {
      state.users.push(action.payload)
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => { state.error = action.error.message })
  }
})

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const allUsers = await axios.get(PATH.USERS_LIST)
  return allUsers.data.map((item) => ({ ...item, online: false }))
})

export const { changeUserStatus } = usersSlice.actions

export default usersSlice.reducer
