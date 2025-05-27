import { useGetPassQuery } from '@/features/auth'
import { ReactNode } from 'react'

export const Redirect = ({ children }: { children: ReactNode }) => {
  const url = window.location.pathname
  const isAdmin = /admin/.test(url)
  const isAuth = /auth/.test(url)
  const shouldFetchPass = isAdmin || isAuth

  const { data: pass } = useGetPassQuery(undefined, {
    skip: !shouldFetchPass,
  })

  if (shouldFetchPass && pass !== undefined && !pass)
    window.history.pushState(null, '', '/auth')
  else if (shouldFetchPass && pass) {
    sessionStorage.setItem('isShowAdminNav', 'true')
  }

  return <>{pass && children}</>
}
