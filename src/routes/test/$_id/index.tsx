import { TestItem } from '@/entities/test'
import { Layout } from '@/shared/layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test/$_id/')({
  beforeLoad: () => {},
  component: () => (
    <>
      <title>test</title>
      <Layout>
        <TestItem />
      </Layout>
    </>
  ),
})
