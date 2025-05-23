import { Layout } from '@/shared/layout'
import { Redirect } from '@/shared/ui'
import { TestWidget } from '@/widgets/tests-widget'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/test/')({
  beforeLoad: () => {},
  component: () => (
    <>
      <title>post</title>
      <Redirect>
        <Layout>
          <TestWidget />
        </Layout>
      </Redirect>
    </>
  ),
})
