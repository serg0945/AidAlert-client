import { useGetPostImagesMutation, useGetPostOneQuery } from '@/entities/post'
import { useParams } from '@tanstack/react-router'
import { Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { FC, useEffect, useState } from 'react'

export const PostItem: FC = () => {
  const { _id } = useParams({ strict: false })
  const { data: post } = useGetPostOneQuery({ _id })
  const [getImages, { data: images }] = useGetPostImagesMutation()
  const [data, setData] = useState<{ content: string; image: any }[]>([])

  useEffect(() => {
    if (post && post.imageFileNames.length !== 0) {
      getImages(post.imageFileNames)
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

  useEffect(() => {
    const result =
      (images &&
        images.length !== 0 &&
        post?.content?.map((content, index) => {
          return {
            content: content,
            image: images[index],
          }
        })) ||
      []
    setData(result)
  }, [images])

  return (
    <div className="flex flex-col gap-6">
      <Typography.Text>{post?.title}</Typography.Text>
      <Typography.Text>{post?.owner}</Typography.Text>
      {data.map((block, blockIndex) => (
        <div className="flex flex-col gap-6" key={blockIndex}>
          <TextArea autoSize value={block.content ?? ''} />
          {block.image && (
            <img className="w-[200px]" src={block.image} alt="Картинка" />
          )}
        </div>
      ))}
    </div>
  )
}
