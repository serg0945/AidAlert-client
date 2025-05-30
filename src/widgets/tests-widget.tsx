import { CategoryCollection } from '@/entities/category'
import { TestCollection, TestItemAdmin } from '@/entities/test'
import { useIsAdmin, useResize } from '@/shared/hooks'
import { H1Custom } from '@/shared/ui'
import { Button } from 'antd'
import { FC, useState } from 'react'
import cn from 'classnames'

export const TestWidget: FC = () => {
  const isAdmin = useIsAdmin()
  const [isAddTest, setIsAddTest] = useState<boolean>(false)
  const { isScreenMob } = useResize()

  return (
    <>
      <H1Custom
        className={cn('pb-4', {
          '!my-0': isScreenMob,
        })}
        value="Тесты"
      />
      <h3>Выберите категорию</h3>
      <CategoryCollection />
      <TestCollection />
      {isAdmin && (
        <div className="mt-4">
          <Button onClick={() => setIsAddTest(true)}>Добавить тест</Button>
        </div>
      )}
      {isAddTest && <TestItemAdmin />}
    </>
  )
}
