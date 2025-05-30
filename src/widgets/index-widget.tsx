import { PostTitleCollection } from '@/entities/post'
import { TestCollection } from '@/entities/test'
import { FC } from 'react'
import {
  HomePagePosts,
  HomePageTests,
  HomePageFirst,
} from '@/shared/assets/images'
import { useResize } from '@/shared/hooks'
import cn from 'classnames'

export const IndexWidget: FC = () => {
  const { isScreenPc, isScreenMob, isScreenMobBig, isScreenPcSmall } =
    useResize()
  return (
    <>
      <div className="mt-10 flex gap-8 items-center justify-between">
        <div>
          <h1 className="mt-10 !text-4xl">Сайт по оказанию первой помощи</h1>
          <p className="max-w-[600px] pb-8">
            Мы поможем вам с легкостью и удобством подобрать материал в
            соответствии с вашими требованиями и интересами
          </p>
          <h2>Что такое AidAlert?</h2>
          <p className="max-w-[600px]">
            AidAlert - это удобный сайт для поиска необходимой информации о том
            как правильно оказывать первую помощь, расскажем о различных
            тонкостях и в общем поможем вам разобраться с комплексом срочных
            мероприятий
          </p>
        </div>
        <img
          className={cn('object-contain rounded-2xl', {
            'max-w-[550px]': isScreenPc,
            'max-w-[100px]': isScreenMobBig,
          })}
          src={HomePageFirst}
        />
      </div>
      <h2 className="mt-14">Возможности</h2>
      <h3>Статьи</h3>
      <p>
        Тесты помогают обновить знания и подходят как для людей без медицинского
        образования, так и для специалистов в области медицины.
      </p>
      <div className="mt-6 gap-12 flex items-center">
        <img
          className="max-w-[400px] object-contain rounded-2xl"
          src={HomePagePosts}
        />
        <div className="flex-grow">
          <PostTitleCollection />
        </div>
      </div>
      <h3 className="mt-10">Тесты</h3>
      <p>
        Тесты помогают обновить знания и подходят как для людей без медицинского
        образования, так и для специалистов в области медицины.
      </p>
      <div className="mt-10 flex gap-12 items-center">
        <div className="flex-grow">
          <TestCollection />
        </div>
        <img
          className="max-w-[400px] object-contain rounded-2xl"
          src={HomePageTests}
        />
      </div>
    </>
  )
}
