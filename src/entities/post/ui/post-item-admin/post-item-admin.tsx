import { AppState } from '@/app/redux'
import {
  useCreatePostMutation,
  useGetPostImagesMutation,
  useGetPostOneQuery,
  useEditPostMutation,
} from '@/entities/post'
import { DeleteConfirmButton } from '@/shared/ui/delete-confirm-button'
import { useParams } from '@tanstack/react-router'
import { Button, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const PostItemAdmin: FC = () => {
  const { _id } = useParams({ strict: false })
  const { data: post } = useGetPostOneQuery({ _id }, { skip: !_id })
  const [save] = useCreatePostMutation()
  const [edit] = useEditPostMutation()
  const [getImages, { data: images }] = useGetPostImagesMutation()
  const [data, setData] = useState<{ content: string; image: any }[]>([])
  const [title, setTitle] = useState<string>('')
  const [owner, setOwner] = useState<string>('')
  const [isShowPreviewImages, setIsShowPreviewImages] = useState<boolean>(true)
  const selectedCategoryId = useSelector(
    (state: AppState) => state.category.selectedCategoryId,
  )

  const isCreate = _id === undefined
  const isEdit = _id !== undefined

  useEffect(() => {
    setTitle(post?.title ?? '')
    setOwner(post?.owner ?? '')
    if (post?.imageFileNames && post?.imageFileNames.length !== 0) {
      getImages(post?.imageFileNames)
    } else if (
      (post?.imageFileNames && post?.imageFileNames.length === 0) ||
      isCreate
    ) {
      setIsShowPreviewImages(false)
    }
    post &&
      setData(
        post?.content.map((content) => {
          return {
            content: content,
            image: null,
          }
        }),
      )
  }, [post])

  console.log(isShowPreviewImages)

  const addBlock = () => {
    setData([...data, { content: '', image: null }])
  }

  const handleBlockChange = (
    index: number,
    field: 'content' | 'image',
    value: string | File,
  ) => {
    const newData = [...data]
    newData[index][field] = value
    setData(newData)
  }

  const handleDeleteBlock = (index: number) => {
    const newData = [...data]
    newData.splice(index, 1)
    setData(newData)
  }

  const handleSubmit = () => {
    const formData = new FormData()

    const payload = {
      title,
      owner,
      content: data.map((block) => block.content),
      images: data.map((block) => block.image),
    }

    formData.append('title', title)
    formData.append('owner', owner)
    isEdit && formData.append('_id', _id)
    formData.append('categoryId', selectedCategoryId)

    payload.content.forEach((content) => {
      formData.append('content', content)
    })

    !isShowPreviewImages &&
      payload.images.forEach((images) => {
        formData.append('images', images)
      })

    isCreate ? save(formData) : edit(formData)
  }

  return (
    <>
      <div className="flex-col flex gap-6 mt-8">
        <Input
          placeholder="Введите заголовок статьи"
          addonBefore="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Введите автора статьи"
          addonBefore="Автор"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        {data.map((block, blockIndex) => (
          <div
            className="flex flex-col gap-6 border p-4 rounded-xl"
            key={blockIndex}
          >
            <TextArea
              placeholder="Введите контент блока"
              value={block.content}
              onChange={(e) =>
                handleBlockChange(blockIndex, 'content', e.target.value)
              }
            />
            <Input
              type="file"
              addonBefore="Картинка"
              disabled={!isCreate && isShowPreviewImages}
              onChange={(e) => {
                const files = e.target.files
                if (files && files[0]) {
                  const file = files[0]
                  handleBlockChange(blockIndex, 'image', file)
                }
              }}
            />
            {isShowPreviewImages && images && (
              <img className="max-w-full" src={images[blockIndex]} />
            )}
            <DeleteConfirmButton
              title="блок"
              onClick={() => handleDeleteBlock(blockIndex)}
              selectedId="post"
              className="mt-0"
            />
            {!isShowPreviewImages ||
              (isCreate && block.image && (
                <img
                  className="max-w-full"
                  src={URL.createObjectURL(block.image)}
                  alt="Картинка"
                />
              ))}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4 mt-6">
          <Button onClick={addBlock}>Добавить блок</Button>
          {isEdit && (
            <DeleteConfirmButton
              title="прошлые картинки"
              onClick={() => setIsShowPreviewImages(false)}
              selectedId="post"
              className="mt-0"
            />
          )}
        </div>
        <Button onClick={handleSubmit}>Сохранить статью</Button>
      </div>
    </>
  )
}
