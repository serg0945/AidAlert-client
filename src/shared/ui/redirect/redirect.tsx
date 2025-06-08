import { useGetPassQuery } from '@/features/auth'
import { ReactNode } from 'react'

export const Redirect = ({ children }: { children: ReactNode }) => {
  const url = window.location.pathname
  const isAdmin = /admin/.test(url)
  const isAuth = /auth/.test(url)
  const shouldFetchPass = isAdmin || isAuth
  const token = localStorage.getItem('token') ?? ''

  const { data: pass } = useGetPassQuery({ token })

  if ((shouldFetchPass && pass !== undefined && !pass) || token === '')
    window.history.pushState(null, '', '/auth')

  return <>{pass && children}</>
}
