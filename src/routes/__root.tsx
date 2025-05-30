import { NotFound } from '@/widgets/not-found'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

export const Route = createRootRouteWithContext()({
  component: () => <Outlet></Outlet>,
  notFoundComponent: () => <NotFound />,
})
