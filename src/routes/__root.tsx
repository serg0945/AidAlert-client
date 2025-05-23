import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

export const Route = createRootRouteWithContext()({
  component: () => <Outlet></Outlet>,
  // notFoundComponent: <div>123</div>,
})
