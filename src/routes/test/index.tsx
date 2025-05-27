import { Layout } from '@/shared/layout'
import { TestWidget } from '@/widgets/tests-widget'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test/')({
  beforeLoad: () => {},
  component: () => (
    <>
      <title>Тесты</title>
      <Layout>
        <TestWidget />
      </Layout>
    </>
  ),
})
