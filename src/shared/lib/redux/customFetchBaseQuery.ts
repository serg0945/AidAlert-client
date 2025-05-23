import {
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

export const customFetchBaseQuery = (basePath: string) => {
  const baseUrl = `http://localhost:5000/${basePath}`
  const baseQuery = fetchBaseQuery({ baseUrl })

  return async (args: string | FetchArgs, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions)
    return result
  }
}
