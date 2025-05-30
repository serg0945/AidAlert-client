import { FC } from 'react'
import cn from 'classnames'
import { useResize } from '@/shared/hooks'

interface H1CustomProps {
  className: string
  value: string
}

export const H1Custom: FC<H1CustomProps> = ({ className, value }) => {
  const { isScreenPc, isScreenPcSmall } = useResize()
  return (
    <h1
      className={cn(className, {
        '!text-[28px]': !isScreenPcSmall && !isScreenPc,
        '!text-3xl': isScreenPcSmall || isScreenPc,
      })}
    >
      {value}
    </h1>
  )
}
