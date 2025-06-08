import { AppState } from '@/app/redux/types'
import {
  useDeleteTestMutation,
  useGetTestRandomQuery,
  useGetTestsByCategoryIdQuery,
} from '@/entities/test'
import { useIsAdmin, useIsIndex } from '@/shared/hooks'
import { EmptyCollection } from '@/shared/ui'
import { DeleteConfirmButton } from '@/shared/ui/delete-confirm-button'
import { Link } from '@tanstack/react-router'
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

  return (
    <>
      <h3 className="mt-8">Выберите тест</h3>
      <div
        className={cn('mb-6 flex flex-col gap-6 rounded-xl', {
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
              'border cursor-pointer rounded-[4px] p-2 border-gray-400 hover:border-emerald-500',
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
      {tests?.length === 0 && (
        <EmptyCollection title="Нет тестов по данной категории" />
      )}
      {isAdmin && (
        <Link
          to="/admin/test/$_id"
          disabled={selectedTestId === ''}
          params={{ _id: selectedTestId }}
          key={selectedTestId}
          className={cn('border py-1 px-3 rounded-[4px] border-gray-300', {
            '!bg-gray-100 !text-gray-300 hover:cursor-not-allowed':
              selectedTestId === '',
            '!text-black cursor-pointer': selectedTestId !== '',
          })}
        >
          Изменить тест
        </Link>
      )}
      {isAdmin && (
        <DeleteConfirmButton
          title="тест"
          onClick={() => remove({ _id: selectedTestId })}
          selectedId={selectedTestId}
        />
      )}
    </>
  )
}
