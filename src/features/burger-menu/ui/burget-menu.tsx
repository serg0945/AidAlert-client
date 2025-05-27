import { FC, useState } from 'react'
import { BurgerMenuIcon, CancelIcon } from '@/shared/assets/icons'
import { Link } from '@tanstack/react-router'
import { useIsAdmin } from '@/shared/hooks'

export const BurgerMenu: FC = () => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false)
  const isAdmin = useIsAdmin()
  return (
    <>
      {!isShowMenu ? (
        <img
          src={BurgerMenuIcon}
          onClick={() => setIsShowMenu(true)}
          className="p-2 border rounded-[10px] cursor-pointer"
        />
      ) : (
        <div className="flex flex-col gap-4">
          <img
            src={CancelIcon}
            onClick={() => setIsShowMenu(false)}
            className="p-2 border rounded-[10px] max-w-[31px] cursor-pointer"
          />
          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-4">
              <Link className="!text-white" to="/">
                Главная
              </Link>
              <Link className="!text-white" to="/post">
                Статьи
              </Link>
              <Link className="!text-white" to="/test">
                Тесты
              </Link>
            </div>
            {isAdmin && (
              <div className="flex flex-col gap-4">
                <Link className="!text-red-800" to="/admin/categories">
                  Категории
                </Link>
                <Link className="!text-red-800" to="/admin/post">
                  Статьи
                </Link>
                <Link className="!text-red-800" to="/admin/test">
                  Тесты
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
