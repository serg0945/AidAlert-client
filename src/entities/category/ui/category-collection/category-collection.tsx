import { AppState } from '@/app/redux'
import {
  CategoryItem,
  useGetCategoryAllQuery,
  CategoryItemAdmin,
  useDeleteCategoryMutation,
  useGetCategoryImagesMutation,
} from '@/entities/category'
import { useIsAdmin, useIsCategory } from '@/shared/hooks'
import { DeleteConfirmButton } from '@/shared/ui/delete-confirm-button'
import { Button } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const CategoryCollection: FC = () => {
  const [isShowCreate, setIsShowCreate] = useState<boolean>(false)
  const { data: categories } = useGetCategoryAllQuery()
  const [getImages, { data: images }] = useGetCategoryImagesMutation()
  const [remove] = useDeleteCategoryMutation()
  const selectedCategoryId = useSelector(
    (state: AppState) => state.category.selectedCategoryId,
  )

  const isAdmin = useIsAdmin()
  const isCategory = useIsCategory()

  const imageFileNames = categories
    ?.filter((item) => item.imageFileName)
    .map((item) => item.imageFileName)

  useEffect(() => {
    if (imageFileNames && imageFileNames?.length !== 0) {
      getImages(imageFileNames as string[])
    }
  }, [categories])

  return (
    <>
      <div className="grid grid-cols-4 gap-6 border rounded-xl p-4 border-gray-300">
        {categories?.map((item, index) => (
          <CategoryItem
            {...item}
            key={item._id}
            image={images ? images[index] : ''}
          />
        ))}
      </div>
      {isAdmin && isCategory && (
        <>
          <Button onClick={() => setIsShowCreate(true)} className="!mt-6 mr-2">
            Создать категорию
          </Button>
          <DeleteConfirmButton
            title="категорию"
            selectedId={selectedCategoryId}
            onClick={() => remove({ _id: selectedCategoryId })}
          />
        </>
      )}
      {isShowCreate && (
        <CategoryItemAdmin title="Создать категорию" method="POST" />
      )}
      {isCategory && selectedCategoryId !== '' && (
        <CategoryItemAdmin title="Изменить категорию" method="PATCH" />
      )}
    </>
  )
}
