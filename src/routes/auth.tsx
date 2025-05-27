import { AuthForm } from '@/features/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  beforeLoad: () => {},
  component: () => (
    <>
      <title>Авторизация</title>
      <AuthForm />
    </>
  ),
})
