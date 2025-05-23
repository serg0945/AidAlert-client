import { AppState } from '@/app/redux/types'
import { CategoryCollection } from '@/entities/category'
import { PostItemAdmin, PostTitleCollection } from '@/entities/post'
import { useIsAdmin } from '@/shared/hooks'
import { Button } from 'antd'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

export const PostsWidget: FC = () => {
  const selectedId = useSelector(
    (state: AppState) => state.category.selectedCategoryId,
  )
  const isAdmin = useIsAdmin()
  const [isShowCreate, setIsShowCreate] = useState<boolean>(false)

  return (
    <>
      <h1 className="pb-10">Статьи</h1>
      <h3>Выберете категорию</h3>
      <CategoryCollection />
      {!!selectedId && <PostTitleCollection />}
      {isAdmin && (
        <Button onClick={() => setIsShowCreate(true)} className="my-8">
          Создать статью
        </Button>
      )}
      {isAdmin && isShowCreate && <PostItemAdmin />}
    </>
  )
}
