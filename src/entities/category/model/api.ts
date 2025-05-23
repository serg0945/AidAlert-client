import { createApi } from '@reduxjs/toolkit/query/react'
import { customFetchBaseQuery, showNotifyApi } from '@/shared/lib'
import { GategoryItemData, EditCategory } from '@/entities/category'

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: customFetchBaseQuery('categories'),
  tagTypes: ['Category'],
  endpoints: (build) => ({
    getCategoryAll: build.query<GategoryItemData[], void>({
      query: () => '',
      providesTags: ['Category'],
    }),
    getCategoryImages: build.mutation<void, string[]>({
      query: (body) => ({
        url: '/images',
        method: 'POST',
        body,
      }),
    }),
    getCategoryOne: build.query<GategoryItemData, { _id?: string }>({
      query: ({ _id }) => ({
        url: `/${_id}`,
      }),
    }),
    createCategory: build.mutation<void, FormData>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
      async onQueryStarted(_, { queryFulfilled }) {
        await showNotifyApi(queryFulfilled, 'Успешно создали категорию')
      },
    }),
    editCategory: build.mutation<void, EditCategory>({
      query: ({ _id, body }) => ({
        url: `/${_id}`,
        method: 'PATCH',
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await showNotifyApi(queryFulfilled, 'Успешно изменили категорию')
      },
    }),
    deleteCategory: build.mutation<void, { _id: string }>({
      query: ({ _id }) => ({
        url: `/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
      async onQueryStarted(_, { queryFulfilled }) {
        await showNotifyApi(queryFulfilled, 'Успешно удалили категорию')
      },
    }),
  }),
})

export const {
  useGetCategoryAllQuery,
  useGetCategoryImagesMutation,
  useGetCategoryOneQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi
