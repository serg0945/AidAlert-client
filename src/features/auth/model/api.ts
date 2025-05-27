import { createApi } from '@reduxjs/toolkit/query/react'
import { customFetchBaseQuery, showNotifyApi } from '@/shared/lib'
import { AuthPayload } from '@/features/auth/lib'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBaseQuery('auth'),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    getPass: build.query<boolean, void>({
      query: () => '',
      providesTags: ['Auth'],
    }),
    authorization: build.mutation<boolean, AuthPayload>({
      query: (body) => ({
        url: '',
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['Auth'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          sessionStorage.setItem('isShowAdminNav', 'false')
          await showNotifyApi(queryFulfilled, undefined, 'Неверные данные')
          setTimeout(() => {
            window.history.pushState(null, '', '/admin')
          }, 200)
        } catch {
          throw new Error('Ошибка')
        }
      },
    }),
    createAuth: build.mutation<boolean, AuthPayload>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body: body,
      }),
    }),
  }),
})

export const {
  useAuthorizationMutation,
  useGetPassQuery,
  useCreateAuthMutation,
} = authApi
