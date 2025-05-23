import { Layout } from '@/shared/layout'
import { Redirect } from '@/shared/ui'
import { AdminWidget } from '@/widgets/admin-widget'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  beforeLoad: () => {},
  component: () => (
    <>
      <title>Admin</title>
      <Redirect>
        <Layout>
          <AdminWidget />
        </Layout>
      </Redirect>
    </>
  ),
})
