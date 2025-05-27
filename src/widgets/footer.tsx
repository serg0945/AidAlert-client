import { FC } from 'react'

export const Footer: FC<{ paddingX: string }> = ({ paddingX }) => {
  return (
    <footer className="bg-emerald-700 mt-16">
      <div className={paddingX + ' h-[100px]'}></div>
    </footer>
  )
}
