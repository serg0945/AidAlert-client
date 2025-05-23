import { Layout } from '@/shared/layout'
import { IndexWidget } from '@/widgets/index-widget'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {},
  component: () => (
    <>
      <title>Главная</title>
      <Layout>
        <IndexWidget />
      </Layout>
    </>
  ),
})
