import { authApi } from '@/features/auth'
import { testApi } from '@/entities/test'
import { combineReducers } from '@reduxjs/toolkit'
import { postApi } from '@/entities/post'
import { categorySlice, categoryApi } from '@/entities/category'

export const rootReducer = combineReducers({
  [postApi.reducerPath]: postApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [testApi.reducerPath]: testApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [categorySlice.reducerPath]: categorySlice.reducer,
})
