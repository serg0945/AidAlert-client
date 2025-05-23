import { Layout } from '@/shared/layout'
import { Redirect } from '@/shared/ui'
import { PostsWidget } from '@/widgets/posts-widget'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/post/')({
  beforeLoad: () => {},
  component: () => (
    <>
      <title>Тесты</title>
      <Redirect>
        <Layout>
          <PostsWidget />
        </Layout>
      </Redirect>
    </>
  ),
})
