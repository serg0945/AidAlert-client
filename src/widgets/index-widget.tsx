import { PostTitleCollection } from '@/entities/post'
import { TestCollection } from '@/entities/test'
import { FC } from 'react'
import MainPageFirst from '@/shared/assets/images/home-page-first.jpg'
import MainPageTests from '@/shared/assets/images/home-page-tests.jpg'
import Aboba from '@/shared/assets/images/Aboba.svg'

export const IndexWidget: FC = () => {
  return (
    <>
      <div>
        <h1 className="mt-10">Сайт по оказанию первой помощи</h1>
        <p className="max-w-[500px]">
          Мы поможем вам с легкостью и удобством подобрать материал в
          соответствии с вашими требованиями и интересами
        </p>
      </div>
      <div className="mt-10 flex gap-8 items-center">
        <div>
          <h2>Что такое AidAlert?</h2>
          <p className="max-w-[500px]">
            AidAlert - это удобный сайт для поиска необходимой информации о том
            как правильно оказывать первую помощь, расскажем о различных
            тонкостях и в общем поможем вам разобраться с комплексом срочных
            мероприятий
          </p>
        </div>
        <img
          className="max-w-[350px] object-contain rounded-2xl"
          src={MainPageFirst}
        />
      </div>
      <h2 className="mt-14">Возможности</h2>
      <h3>Статьи</h3>
      <div className="mt-6 gap-12 flex items-center">
        <img className="max-w-[300px] object-contain rounded-2xl" src={Aboba} />
        <div className="flex-grow">
          <p>
            Тесты помогают обновить знания и подходят как для людей без
            медицинского образования, так и для специалистов в области медицины.
          </p>
          <PostTitleCollection />
        </div>
      </div>
      <h3 className="mt-10">Тесты</h3>
      <div className="flex gap-12 items-center">
        <div className="flex-grow">
          <p>
            Тесты помогают обновить знания и подходят как для людей без
            медицинского образования, так и для специалистов в области медицины.
          </p>
          <TestCollection />
        </div>
        <img
          className="max-w-[300px] object-contain rounded-2xl"
          src={MainPageTests}
        />
      </div>
    </>
  )
}
