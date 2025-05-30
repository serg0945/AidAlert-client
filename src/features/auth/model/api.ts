import { createApi } from '@reduxjs/toolkit/query/react'
import { customFetchBaseQuery, showNotifyApi } from '@/shared/lib'
import { AuthPayload } from '@/features/auth/lib'

interface AuthResponse {
  access_token: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBaseQuery('auth'),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    getPass: build.query<boolean, { token?: string }>({
      query: ({ token }) => ({
        url: `/${token}`,
      }),
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
          await showNotifyApi(queryFulfilled, undefined, 'Неверные данные')
          const { data } = (await queryFulfilled) as unknown as {
            data: AuthResponse
          }
          localStorage.setItem('token', data.access_token)
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
  useGetPassQuery,
  useAuthorizationMutation,
  useCreateAuthMutation,
} = authApi
