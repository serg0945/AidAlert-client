import { Layout } from '@/shared/layout'
import { PostsWidget } from '@/widgets/posts-widget'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/post/')({
  beforeLoad: () => {},
  component: () => (
    <>
      <title>Статьи</title>
      <Layout>
        <PostsWidget />
      </Layout>
    </>
  ),
})
