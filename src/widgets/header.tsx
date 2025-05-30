import { useGetPassQuery } from '@/features/auth'
import { BurgerMenu } from '@/features/burger-menu'
import { Logo } from '@/shared/assets/icons'
import { useResize } from '@/shared/hooks'
import { Link } from '@tanstack/react-router'
import { FC } from 'react'
import cn from 'classnames'

export const Header: FC<{ paddingX: string }> = ({ paddingX }) => {
  const { isScreenMobBig, isScreenMob } = useResize()
  const token = localStorage.getItem('token') ?? ''
  const { data: pass } = useGetPassQuery({ token })
  return (
    <header className="bg-emerald-400 mb-5">
      <div
        className={cn(paddingX + ' flex gap-6 pb-4 items-center', {
          'justify-start': !isScreenMobBig && !isScreenMob,
          'justify-between': isScreenMobBig || isScreenMob,
        })}
      >
        {(isScreenMobBig || isScreenMob) && <BurgerMenu pass={pass ?? false} />}
        <Link to="/">
          <img src={Logo} />
        </Link>
        {(isScreenMobBig || isScreenMob) && (
          <div className="w-[30px] h-[30px]"></div>
        )}
        {!isScreenMobBig && !isScreenMob && (
          <div className="flex gap-6 items-center">
            <Link className="!text-white hover:!text-emerald-700" to="/post">
              Статьи
            </Link>
            <Link className="!text-white hover:!text-emerald-700" to="/test">
              Тесты
            </Link>
            {pass && (
              <>
                <Link
                  className="!text-red-800 hover:!text-emerald-700"
                  to="/admin/post"
                >
                  Статьи
                </Link>
                <Link
                  className="!text-red-800 hover:!text-emerald-700"
                  to="/admin/test"
                >
                  Тесты
                </Link>
                <Link
                  className="!text-red-800 hover:!text-emerald-700"
                  to="/admin/categories"
                >
                  Категории
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
