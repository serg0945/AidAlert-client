import { AppState } from '@/app/redux/types'
import { CategoryCollection } from '@/entities/category'
import { PostItemAdmin, PostTitleCollection } from '@/entities/post'
import { useIsAdmin, useResize } from '@/shared/hooks'
import { H1Custom } from '@/shared/ui'
import { Button } from 'antd'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'

export const PostsWidget: FC = () => {
  const [isShowCreate, setIsShowCreate] = useState<boolean>(false)
  const selectedId = useSelector(
    (state: AppState) => state.category.selectedCategoryId,
  )
  const isAdmin = useIsAdmin()
  const { isScreenMob } = useResize()

  return (
    <>
      <H1Custom
        className={cn('pb-4', {
          '!my-0': isScreenMob,
        })}
        value="Статьи"
      />
      <h3>Выберите категорию</h3>
      <CategoryCollection />
      {!!selectedId && <PostTitleCollection />}
      {isAdmin && (
        <Button onClick={() => setIsShowCreate(true)} className="!mt-4">
          Создать статью
        </Button>
      )}
      {isAdmin && isShowCreate && <PostItemAdmin />}
    </>
  )
}
