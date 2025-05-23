import { useIsAdmin } from '@/shared/hooks'
import { Link } from '@tanstack/react-router'
import { FC } from 'react'

export const Header: FC = () => {
  // const { isScreenMd } = useResize()
  const isAdmin = useIsAdmin()
  return (
    <header className="bg-emerald-400 mb-5 pt-3 px-[100px]">
      <div className="flex gap-6 pb-4 border-b">
        <Link className="!text-white" to="/">
          Главная{' '}
        </Link>
        <Link className="!text-white" to="/post">
          Статьи
        </Link>
        <Link className="!text-white" to="/test">
          Тесты
        </Link>
      </div>
      {isAdmin && (
        <div className="flex gap-6 my-4">
          <Link className="!text-white" to="/">
            Главная
          </Link>
          <Link className="!text-white" to="/admin/post">
            Статьи
          </Link>
          <Link className="!text-white" to="/admin/test">
            Тесты
          </Link>
          <Link className="!text-white" to="/admin/categories">
            Категории
          </Link>
        </div>
      )}
      {/* <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>Категория</Space>
            <img
              className="w-6"
              onClick={() => setIsOpenMenu((prev) => !prev)}
              src={isOpenMenu ? CancelIcon : BurgerMenuIcon}
              alt={isOpenMenu ? 'Закрыть меню' : 'Открыть меню'}
            />
          </a>
        </Dropdown> */}
    </header>
  )
}
