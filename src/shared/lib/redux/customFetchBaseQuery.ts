import { SERVER_BASE_URL } from '@/shared/config'
import { FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const customFetchBaseQuery = (basePath: string) => {
  const baseUrl = `${SERVER_BASE_URL}/${basePath}`
  const baseQuery = fetchBaseQuery({ baseUrl })

  return async (args: string | FetchArgs, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions)
    return result
  }
}
