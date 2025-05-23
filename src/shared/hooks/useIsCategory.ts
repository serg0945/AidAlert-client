import { useRouter } from '@tanstack/react-router'

export const useIsCategory = () => {
  const router = useRouter()
  const isAdmin = /categories/.test(router.latestLocation.pathname)
  return isAdmin
}
