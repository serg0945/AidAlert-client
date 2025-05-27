import { AppState } from '@/app/redux/types'
import {
  useDeletePostMutation,
  useGetPostRandomQuery,
  useGetPostsByCategoryIdQuery,
} from '@/entities/post'
import { useIsAdmin, useIsIndex } from '@/shared/hooks'
import { EmptyCollection } from '@/shared/ui'
import { DeleteConfirmButton } from '@/shared/ui/delete-confirm-button'
import { Link } from '@tanstack/react-router'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'

export const PostTitleCollection: FC = () => {
  const isIndex = useIsIndex()
  const isAdmin = useIsAdmin()
  const selectedCategoryId = useSelector(
    (state: AppState) => state.category.selectedCategoryId,
  )
  const [selectedPostId, setSelectedPostId] = useState<string>('')

  const { data: randomPosts } = useGetPostRandomQuery(undefined, {
    skip: !isIndex,
  })

  const { data: postsByCategory } = useGetPostsByCategoryIdQuery(
    {
      _id: selectedCategoryId,
    },
    { skip: isIndex },
  )
  const [remove] = useDeletePostMutation()

  const posts = isIndex ? randomPosts : postsByCategory

  return (
    <>
      <h3 className="mt-8">Выберите статью</h3>
      <div
        className={
          posts?.length !== 0
            ? 'flex flex-col border rounded-xl p-4 gap-4 mb-6 border-gray-300'
            : ''
        }
      >
        {posts?.map((item) => (
          <div key={item._id}>
            <Link
              to="/post/$_id"
              params={{ _id: item._id }}
              key={item._id}
              disabled={isAdmin}
              onClick={() => setSelectedPostId(item._id)}
            >
              <div
                className={cn(
                  'border p-2 rounded-md border-gray-400 hover:border-emerald-500',
                  {
                    'border-emerald-500 text-emerald-500':
                      selectedPostId === item._id,
                  },
                )}
              >
                <p className="text-gray-400">{item.owner}</p>
                <p>{item.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {isAdmin && (
        <>
          <Link
            to="/admin/post/$_id"
            disabled={selectedPostId === ''}
            params={{ _id: selectedPostId }}
            key={selectedPostId}
            className={cn(
              'border py-1 px-3 !mt-4 border-gray-300 rounded-[5px]',
              {
                '!bg-gray-100 !text-gray-300': selectedPostId === '',
              },
            )}
          >
            Изменить статью
          </Link>
          <DeleteConfirmButton
            title="статью"
            selectedId={selectedPostId}
            onClick={() => remove({ _id: selectedPostId })}
          />
        </>
      )}
      {posts?.length === 0 && (
        <EmptyCollection title="Нет статей по данной категории" />
      )}
    </>
  )
}
