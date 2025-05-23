import { AppState } from '@/app/redux'
import {
  useCreateCategoryMutation,
  useGetCategoryOneQuery,
} from '@/entities/category'
import { Button, Input } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface CategoryItemAdminProps {
  title: string
}

export const CategoryItemAdmin: FC<CategoryItemAdminProps> = ({ title }) => {
  const [name, setName] = useState<string>('')
  const [image, setImage] = useState<any>()
  const [save] = useCreateCategoryMutation()
  const selectedCategoryId = useSelector(
    (state: AppState) => state.category.selectedCategoryId,
  )
  const { data: category } = useGetCategoryOneQuery(
    { _id: selectedCategoryId },
    { skip: selectedCategoryId === '' },
  )

  useEffect(() => {
    category && setName(category.name)
  }, [category])

  const handleSubmit = () => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('image', image)

    save(formData)
  }

  return (
    <div className="flex flex-col gap-6 border p-4 mb-6 rounded-xl border-gray-300">
      <h2>{title}</h2>
      <Input onChange={(e) => setName(e.target.value)} value={name} />
      <Input
        type="file"
        onChange={(e) => {
          const files = e.target.files
          if (files && files.length > 0) setImage(files[0])
        }}
      />
      {image && (
        <div className="flex items-center">
          <img
            className="w-[100px]"
            src={URL.createObjectURL(image)}
            alt="Картинка"
          />
          <button onClick={() => setImage(undefined)} className="ml-2">
            Очистить
          </button>
        </div>
      )}
      <Button onClick={handleSubmit}>Сохранить категорию</Button>
    </div>
  )
}
