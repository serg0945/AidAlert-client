import { AppState } from '@/app/redux/types'
import {
  useDeletePostMutation,
  useGetPostRandomQuery,
  useGetPostsByCategoryIdQuery,
} from '@/entities/post'
import { useIsAdmin, useIsIndex } from '@/shared/hooks'
import { EmptyCollection } from '@/shared/ui'
import { Link } from '@tanstack/react-router'
import { Button } from 'antd'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

export const PostTitleCollection: FC = () => {
  const isIndex = useIsIndex()
  const isAdmin = useIsAdmin()
  const selectedCategoryId = useSelector(
    (state: AppState) => state.category.selectedCategoryId,
  )
  const [selectedPostId, setSelectedPostId] = useState<string>()

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
    <div className="flex flex-col border rounded-xl p-4 gap-6 mt-8">
      {posts?.map((item) => (
        <div key={item._id}>
          <Link
            to="/post/$_id"
            params={{ _id: item._id }}
            key={item._id}
            disabled={isAdmin}
            // className={cn(
            //   'hover:bg-emerald-300 border cursor-pointer rounded-[4px] py-2 px-4',
            //   {
            //     '!bg-emerald-300': selectedPostId === item._id,
            //   },
            // )}
            onClick={() => setSelectedPostId(item._id)}
          >
            <div className="border p-2 rounded-md">
              <p>{item.owner}</p>
              <p>{item.title}</p>
            </div>
          </Link>
        </div>
      ))}
      {isAdmin && (
        <Button
          disabled={selectedPostId === ''}
          onClick={() => remove({ _id: selectedPostId })}
        >
          Удалить статью
        </Button>
      )}
      {posts?.length === 0 && (
        <EmptyCollection title="Нет статей по данной категории" />
      )}
    </div>
  )
}
