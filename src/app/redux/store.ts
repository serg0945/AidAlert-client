import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducer'
import { categoryApi } from '@/entities/category/model/api'
import { testApi } from '@/entities/test'
import { authApi } from '@/features/auth'
import { postApi } from '@/entities/post/model'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      postApi.middleware,
      categoryApi.middleware,
      testApi.middleware,
      authApi.middleware,
    ]),
  devTools: true,
})
