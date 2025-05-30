import { FC, ReactElement } from 'react'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import cn from 'classnames'
import { useResize } from '@/shared/hooks'

export const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  const { isScreenPc, isScreenMob, isScreenMobBig, isScreenPcSmall } =
    useResize()

  const paddingX = cn('pt-[20px] grow', {
    'px-[300px]': isScreenPc,
    'px-[100px]': isScreenPcSmall,
    'px-[70px]': isScreenMobBig,
    'px-[10px]': isScreenMob,
  })

  return (
    <div className="flex flex-col h-[100vh]">
      <Header paddingX={paddingX} />
      <main className={paddingX}>{children}</main>
      <Footer paddingX={paddingX} />
    </div>
  )
}
