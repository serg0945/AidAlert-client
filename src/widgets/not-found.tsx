import { Link } from '@tanstack/react-router'
import { FC } from 'react'

export const NotFound: FC = () => {
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <h3>Страница не найдена</h3>
      <Link
        to="/"
        className="border rounded-[5px] p-2 !bg-gray-100 border-gray-500"
      >
        Вернуться на главную страницу
      </Link>
    </div>
  )
}
