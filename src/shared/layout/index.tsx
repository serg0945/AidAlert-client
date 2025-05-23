import { FC, ReactElement } from 'react'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import cn from 'classnames'
import { useResize } from '@/shared/hooks'

export const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  const {
    isScreenPc,
    isScreenPcSmall,
    isScreenTab,
    isScreenMob,
    isScreenMobBig,
  } = useResize()
  return (
    <div className="flex flex-col h-[100vh]">
      <Header />
      <main
        className={cn('pt-[20px] grow', {
          'px-[300px]': isScreenPc,
          'px-[250px]': isScreenPcSmall,
          'px-[100px]': isScreenTab || isScreenMobBig,
          'px-[50px]': isScreenMob,
        })}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
