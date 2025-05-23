import { AuthWidget } from '@/widgets/auth-widget'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  beforeLoad: () => {},
  component: () => (
    <>
      <title>Авторизация</title>
      <AuthWidget />
    </>
  ),
})
