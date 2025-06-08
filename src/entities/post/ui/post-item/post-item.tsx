import { useGetPostImagesMutation, useGetPostOneQuery } from '@/entities/post'
import { useResize } from '@/shared/hooks'
import { H1Custom } from '@/shared/ui'
import { useParams } from '@tanstack/react-router'
import TextArea from 'antd/es/input/TextArea'
import { FC, useEffect, useState } from 'react'
import cn from 'classnames'

export const PostItem: FC = () => {
  const { _id } = useParams({ strict: false })
  const { data: post } = useGetPostOneQuery(
    { _id },
    {
      refetchOnMountOrArgChange: true,
    },
  )
  const [getImages, { data: images }] = useGetPostImagesMutation()
  const [data, setData] = useState<{ content: string; image: any }[]>([])

  const { isScreenPc, isScreenMob, isScreenPcSmall, isScreenTabletBig } =
    useResize()

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
    <div
      className={cn('flex flex-col gap-6', {
        'px-60': isScreenPc || (isScreenPcSmall && !isScreenTabletBig),
        'px-26': isScreenTabletBig && isScreenPcSmall,
        'px-6': isScreenMob,
      })}
    >
      <H1Custom className="!mb-0" value={post?.title ?? ''} />
      <h3 className="text-gray-500">{post?.owner}</h3>
      {data.map((block, blockIndex) => (
        <div className="flex flex-col gap-6" key={blockIndex}>
          <TextArea
            autoSize
            value={block.content ?? ''}
            className="!border-none !p-0"
          />
          {block.image && (
            <img className="max-w-full" src={block.image} alt="Картинка" />
          )}
        </div>
      ))}
      <h3 className="text-gray-500">123</h3>
    </div>
  )
}
