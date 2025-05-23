import { CategoryCollection } from '@/entities/category'
import { TestCollection, TestItemAdmin } from '@/entities/test'
import { useIsAdmin } from '@/shared/hooks'
import { Button } from 'antd'
import { FC, useState } from 'react'

export const TestWidget: FC = () => {
  const isAdmin = useIsAdmin()
  const [isAddTest, setIsAddTest] = useState<boolean>(false)

  return (
    <>
      <h1 className="pb-10">Тесты</h1>
      <h3>Выберете категорию</h3>
      <CategoryCollection />
      <TestCollection />
      {isAdmin && (
        <div className="mt-6">
          <Button onClick={() => setIsAddTest(true)}>Добавить тест</Button>
        </div>
      )}
      {isAddTest && <TestItemAdmin />}
    </>
  )
}
