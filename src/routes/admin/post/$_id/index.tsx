import { PostItemAdmin } from '@/entities/post'
import { Layout } from '@/shared/layout'
import { Redirect } from '@/shared/ui'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/post/$_id/')({
  beforeLoad: () => {},
  component: () => (
    <>
      <title>Статья</title>
      <Redirect>
        <Layout>
          <PostItemAdmin />
        </Layout>
      </Redirect>
    </>
  ),
})
