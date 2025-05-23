import { createApi } from '@reduxjs/toolkit/query/react'
import { PostItemData } from '../lib/types'
import { customFetchBaseQuery, showNotifyApi } from '@/shared/lib'

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: customFetchBaseQuery('posts'),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPostOne: build.query<PostItemData, { _id?: string }>({
      query: (_id) => ({
        url: '',
        params: _id,
      }),
    }),
    getPostImages: build.mutation<string[], string[]>({
      query: (body) => ({
        url: '/images',
        method: 'POST',
        body,
      }),
    }),
    getPostRandom: build.query<PostItemData[], void>({
      query: () => ({
        url: '/random',
      }),
    }),
    getPostsByCategoryId: build.query<PostItemData[], { _id: string }>({
      query: (_id) => ({
        url: '/category',
        params: _id,
      }),
      providesTags: ['Posts'],
    }),
    createPost: build.mutation<void, FormData>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
      async onQueryStarted(_, { queryFulfilled }) {
        await showNotifyApi(queryFulfilled, 'Успешно создали статью')
      },
    }),
    editPost: build.mutation<void, FormData>({
      query: (body) => ({
        url: '',
        method: 'PATCH',
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await showNotifyApi(queryFulfilled, 'Успешно изменили статью')
      },
    }),
    deletePost: build.mutation<void, { _id?: string }>({
      query: ({ _id }) => ({
        url: `/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
      async onQueryStarted(_, { queryFulfilled }) {
        await showNotifyApi(queryFulfilled, 'Успешно удалили статью')
      },
    }),
  }),
})

export const {
  useGetPostOneQuery,
  useGetPostsByCategoryIdQuery,
  useGetPostImagesMutation,
  useGetPostRandomQuery,
  useEditPostMutation,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApi
