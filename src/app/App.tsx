import '@/app/styles/index.css'
import '@ant-design/v5-patch-for-react-19'
import { routeTree } from '@/routeTree.gen'
import {
  createRouter,
  ErrorComponent,
  RouterProvider,
} from '@tanstack/react-router'
import * as Antd from 'antd'
import { ToastContainer } from 'react-toastify'

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <p>aboba</p>
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const App = () => {
  return (
    <Antd.App>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop
        closeOnClick={false}
        pauseOnHover
        className="mt-4"
      />
    </Antd.App>
  )
}
