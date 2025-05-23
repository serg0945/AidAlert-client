import { Link } from '@tanstack/react-router'
import { FC } from 'react'

export const AdminWidget: FC = () => {
  return (
    <div className="flex gap-4 h-[100vh] justify-center items-center">
      <Link
        className="border p-2 rounded-[6px] border-gray-400 hover:border-emerald-500"
        to="/admin/post"
      >
        Статьи
      </Link>
      <Link
        className="border p-2 rounded-[6px] border-gray-400 hover:border-emerald-500"
        to="/admin/test"
      >
        Тесты
      </Link>
      <Link
        className="border p-2 rounded-[6px] border-gray-400 hover:border-emerald-500"
        to="/admin/categories"
      >
        Категории
      </Link>
    </div>
  )
}
