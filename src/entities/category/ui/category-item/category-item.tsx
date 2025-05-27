import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCategoryId, GategoryItemData } from '@/entities/category'
import { AppState } from '@/app/redux'
import cn from 'classnames'

export const CategoryItem: FC<GategoryItemData> = (props) => {
  const dispatch = useDispatch()
  const selectedCategoryId = useSelector(
    (state: AppState) => state.category.selectedCategoryId,
  )
  const { name, image, _id } = props

  return (
    <div
      className={cn(
        'border rounded-[6px] hover:border-emerald-600 p-2 duration-300 transition-colors cursor-pointer flex flex-col items-center justify-center shadow-lg mb-2',
        {
          'bg-emerald-300 border-emerald-600': selectedCategoryId === _id,
        },
      )}
      onClick={() => dispatch(setSelectedCategoryId(_id))}
    >
      <p className="pb-2">{name}</p>
      {image && <img src={image} className="w-20" />}
    </div>
  )
}
