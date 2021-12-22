import { configureStore } from '@reduxjs/toolkit'
import userInfo from './slaices/userInfo'
import users from './slaices/users'

export const store = configureStore({
  reducer: {
    userInfo,
    users
  }
})
