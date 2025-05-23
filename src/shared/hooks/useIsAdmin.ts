import { useRouter } from '@tanstack/react-router'

export const useIsAdmin = () => {
  const router = useRouter()
  const isAdmin = /admin/.test(router.latestLocation.pathname)
  return isAdmin
}
