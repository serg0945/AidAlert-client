import SadSmile from '@/shared/assets/icons/sad-smile.svg'
import { FC } from 'react'

interface EmptyCollectionProps {
  title: string
}

export const EmptyCollection: FC<EmptyCollectionProps> = ({ title }) => (
  <div className="my-10">
    <img src={SadSmile} />
    <p className="!text-[20px] pt-4">{title}</p>
  </div>
)
