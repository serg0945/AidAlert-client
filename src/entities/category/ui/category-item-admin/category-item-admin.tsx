import { AppState } from '@/app/redux'
import {
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryOneQuery,
} from '@/entities/category'
import { ALLOWED_TYPES_IMAGE } from '@/shared/config'
import { notify } from '@/shared/lib'
import { Button, Input } from 'antd'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface CategoryItemAdminProps {
  title: string
  method: 'PATCH' | 'POST'
}

export const CategoryItemAdmin: FC<CategoryItemAdminProps> = ({
  title,
  method,
}) => {
  const [name, setName] = useState<string>('')
  const [image, setImage] = useState<any>()
  const [save] = useCreateCategoryMutation()
  const [edit] = useEditCategoryMutation()
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
    selectedCategoryId && formData.append('_id', selectedCategoryId)

    method === 'POST' && save(formData)
    method === 'PATCH' && edit(formData)
  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const file = files[0]
      if (Math.floor(file.size / 1024) > 1000) {
        notify('Картинка должна быть до 1 мб!')
        return
      } else if (!ALLOWED_TYPES_IMAGE.includes(file.type)) {
        notify('Поддерживаются форматы: JPEG, SVG, JPG, PNG')
        return
      } else if (files.length > 0) setImage(files[0])
    }
  }

  return (
    <>
      <div className="flex flex-col gap-6 border p-4 my-6 rounded-xl border-gray-300">
        <h2>{title}</h2>
        <Input onChange={(e) => setName(e.target.value)} value={name} />
        <Input type="file" onChange={(e) => handleChangeImage(e)} />
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
      </div>
      <Button onClick={handleSubmit}>Сохранить категорию</Button>
    </>
  )
}
