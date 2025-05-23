import { TestItemAdmin } from '@/entities/test/ui/test-item-admin'
import { Layout } from '@/shared/layout'
import { Redirect } from '@/shared/ui'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/test/$_id/')({
  beforeLoad: () => {},
  component: () => (
    <>
      <title>admin</title>
      <Redirect>
        <Layout>
          <TestItemAdmin />
        </Layout>
      </Redirect>
    </>
  ),
})
