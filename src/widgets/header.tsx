import { Logo } from '@/shared/assets/icons'
import { Link } from '@tanstack/react-router'
import { FC } from 'react'

export const Header: FC<{ paddingX: string }> = ({ paddingX }) => {
  // const { isScreenMd } = useResize()
  const isShowAdminNav = sessionStorage.getItem('isShowAdminNav')
  return (
    <header className="bg-emerald-400 mb-5">
      <div className={paddingX + ' flex gap-6 pb-4 justify-start items-center'}>
        {/* <BurgerMenu /> */}
        <Link to="/">
          <img src={Logo} />
        </Link>
        <div className="flex gap-6 items-center">
          {/* <div> */}
          <Link className="!text-white hover:!text-emerald-700" to="/post">
            Статьи
          </Link>
          <Link className="!text-white hover:!text-emerald-700" to="/test">
            Тесты
          </Link>
          {isShowAdminNav === 'true' && (
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
      </div>
    </header>
  )
}
