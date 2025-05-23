import { useRouter } from '@tanstack/react-router'

export const useIsIndex = () => {
  const router = useRouter()
  const isIndex = /^\/$/.test(router.latestLocation.pathname)
  return isIndex
}
