import { createApi } from '@reduxjs/toolkit/query/react'
import { Test, TestOne } from '../lib/types'
import { customFetchBaseQuery, showNotifyApi } from '@/shared/lib'

export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: customFetchBaseQuery('tests'),
  tagTypes: ['Test', 'TestOne'],
  endpoints: (build) => ({
    getTestOne: build.query<TestOne, { _id?: string }>({
      query: (_id) => ({
        url: '',
        params: _id,
      }),
      providesTags: ['Test'],
    }),
    getTestRandom: build.query<Test[], void>({
      query: () => ({
        url: '/random',
      }),
    }),
    getTestsByCategoryId: build.query<Test[], { _id: string }>({
      query: (_id) => ({
        url: '/category',
        params: _id,
      }),
      providesTags: ['Test'],
    }),
    createTest: build.mutation<void, Omit<Test, '_id'>>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Test'],
      async onQueryStarted(_, { queryFulfilled }) {
        await showNotifyApi(queryFulfilled, 'Успешно создали тест')
      },
    }),
    updateTest: build.mutation<void, Test>({
      query: (body) => ({
        url: '',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Test'],
      async onQueryStarted(_, { queryFulfilled }) {
        await showNotifyApi(queryFulfilled, 'Успешно изменили тест')
      },
    }),
    deleteTest: build.mutation<void, { _id: string }>({
      query: ({ _id }) => ({
        url: `/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Test'],
      async onQueryStarted(_, { queryFulfilled }) {
        await showNotifyApi(queryFulfilled, 'Успешно удалили тест')
      },
    }),
  }),
})

export const {
  useGetTestOneQuery,
  useGetTestRandomQuery,
  useGetTestsByCategoryIdQuery,
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
} = testApi
