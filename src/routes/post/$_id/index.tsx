import { PostItem } from '@/entities/post/ui/post-item'
import { Layout } from '@/shared/layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/post/$_id/')({
  beforeLoad: () => {},
  component: () => (
    <>
      <title>Статья</title>
      <Layout>
        <PostItem />
      </Layout>
    </>
  ),
})
