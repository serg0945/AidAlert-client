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
import { H1Custom } from '@/shared/ui'

export const IndexWidget: FC = () => {
  const { isScreenPc, isScreenMob, isScreenMobBig, isScreenPcSmall } =
    useResize()
  console.log(isScreenMob)
  return (
    <>
      <div
        className={cn('gap-8', {
          'flex items-center justify-between mt-10':
            isScreenPcSmall || isScreenPc,
          'flex flex-col': isScreenMobBig || isScreenMob,
        })}
      >
        <div>
          <H1Custom
            className="mt-10 !text-4xl"
            value="Сайт по оказанию первой помощи"
          />
          <p className="max-w-[600px] pb-8">
            Мы поможем вам с легкостью и удобством подобрать материал в
            соответствии с вашими требованиями и интересами
          </p>
          {isScreenMob && <h3>Что такое AidAlert?</h3>}
          {(isScreenPc || isScreenMobBig || isScreenPcSmall) && (
            <h3>Что такое AidAlert?</h3>
          )}
          <p className="max-w-[600px]">
            AidAlert - это удобный сайт для поиска необходимой информации о том
            как правильно оказывать первую помощь, расскажем о различных
            тонкостях и в общем поможем вам разобраться с комплексом срочных
            мероприятий
          </p>
        </div>
        <img
          className={cn('object-contain rounded-2xl m-auto', {
            'max-w-[550px]': isScreenPc,
            'max-w-[400px]': isScreenPcSmall,
            'max-w-[300px]': isScreenMobBig || isScreenMob,
          })}
          src={HomePageFirst}
        />
      </div>
      <h2
        className={cn('', {
          'mt-14': isScreenPcSmall || isScreenPc,
          'mt-10': isScreenMobBig || isScreenMob,
        })}
      >
        Возможности
      </h2>
      <h3>Статьи</h3>
      <p>
        Статьи на нашем сайте важны для образования и повышения осведомленности
        людей о принципах первой помощи. Они обеспечивают доступ к актуальной
        информации, содержат практические советы и пошаговые инструкции по
        действиям в экстренных ситуациях.
      </p>
      <div
        className={cn('mt-6 flex', {
          'items-center gap-12': isScreenPc || isScreenPcSmall,
          'flex-col gap-4': isScreenMobBig || isScreenMob,
        })}
      >
        <img
          className={cn('object-contain rounded-2xl m-auto', {
            'max-w-[550px]': isScreenPc,
            'max-w-[400px]': isScreenPcSmall,
            'max-w-[350px]': isScreenMobBig,
            'max-w-[250px]': isScreenMob,
          })}
          src={HomePagePosts}
        />
        <div className="flex-grow">
          <PostTitleCollection />
        </div>
      </div>
      <h3
        className={cn('', {
          'mt-14': isScreenPcSmall || isScreenPc,
          'mt-2': isScreenMobBig || isScreenMob,
        })}
      >
        Тесты
      </h3>
      <p>
        Тесты помогают обновить знания и подходят как для людей без медицинского
        образования, так и для специалистов в области медицины.
      </p>
      <div
        className={cn('flex', {
          'items-center gap-12 mt-10': isScreenPc || isScreenPcSmall,
          'flex-col gap-2 mt-0': isScreenMobBig || isScreenMob,
        })}
      >
        <div className="flex-grow">
          <TestCollection />
        </div>
        <img
          className={cn('object-contain rounded-2xl m-auto', {
            'max-w-[550px]': isScreenPc,
            'max-w-[400px]': isScreenPcSmall,
            'max-w-[350px]': isScreenMobBig,
            'max-w-[250px]': isScreenMob,
          })}
          src={HomePageTests}
        />
      </div>
    </>
  )
}
