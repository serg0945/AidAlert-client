import { CategoryCollection } from '@/entities/category'
import { Layout } from '@/shared/layout'
import { Redirect } from '@/shared/ui'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/categories')({
  beforeLoad: () => {},
  component: () => (
    <>
      <title>Категории</title>
      <Redirect>
        <Layout>
          <CategoryCollection />
        </Layout>
      </Redirect>
    </>
  ),
})
