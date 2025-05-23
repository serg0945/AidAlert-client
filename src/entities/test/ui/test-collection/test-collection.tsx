import { AppState } from '@/app/redux/types'
import {
  useDeleteTestMutation,
  useGetTestRandomQuery,
  useGetTestsByCategoryIdQuery,
} from '@/entities/test'
import { useIsAdmin, useIsIndex } from '@/shared/hooks'
import { EmptyCollection } from '@/shared/ui'
import { Link } from '@tanstack/react-router'
import { Button } from 'antd'
import cn from 'classnames'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

export const TestCollection: FC = () => {
  const isIndex = useIsIndex()
  const isAdmin = useIsAdmin()
  const selectedCategoryId = useSelector(
    (state: AppState) => state.category.selectedCategoryId,
  )
  const [selectedTestId, setSelectedTestId] = useState<string>('')
  const [remove] = useDeleteTestMutation()

  const { data: testsRandom } = useGetTestRandomQuery(undefined, {
    skip: !isIndex,
  })

  const { data: testsByCategory } = useGetTestsByCategoryIdQuery(
    {
      _id: selectedCategoryId,
    },
    { skip: selectedCategoryId === '' },
  )

  const tests = isIndex ? testsRandom : testsByCategory

  const link = isAdmin ? '/admin/test/$_id' : '/test/$_id'

  return (
    <>
      <div
        className={cn('my-6 flex flex-col gap-6 rounded-xl', {
          'border p-4 border-gray-300': tests && tests?.length !== 0,
        })}
      >
        {tests?.map((item, index) => (
          <Link
            key={index}
            to="/test/$_id"
            disabled={isAdmin}
            params={{ _id: item._id }}
            className={cn(
              'hover:bg-emerald-300 border cursor-pointer rounded-[4px] py-2 px-4',
              {
                '!border-emerald-500': selectedTestId === item._id,
              },
            )}
            onClick={() => setSelectedTestId(item._id)}
          >
            <div>
              <p className="text-gray-400">{item.owner}</p>
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
      {isAdmin && (
        <Link
          to={link}
          disabled={selectedTestId === ''}
          params={{ _id: selectedTestId }}
          key={selectedTestId}
          className={cn('border py-1 px-3', {
            '!bg-gray-100': selectedTestId === '',
          })}
        >
          Перейти
        </Link>
      )}
      {isAdmin && (
        <Button
          disabled={selectedTestId === ''}
          onClick={() => remove({ _id: selectedTestId })}
        >
          Удалить тест
        </Button>
      )}
      {tests?.length === 0 && (
        <EmptyCollection title="Нет тестов по данной категории" />
      )}
    </>
  )
}
