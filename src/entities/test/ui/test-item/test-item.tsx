import {
  getNumberCorrectAnswers,
  SelectedAnswerValue,
} from '@/entities/test/lib'
import { useGetTestOneQuery } from '@/entities/test/model'
import { H1Custom } from '@/shared/ui'
import { useParams } from '@tanstack/react-router'
import { Button, Radio } from 'antd'
import { FC, useState } from 'react'

export const TestItem: FC = () => {
  const { _id } = useParams({ strict: false })
  const { data: test } = useGetTestOneQuery({ _id })
  const [selectedValues, setSelectedValues] = useState<SelectedAnswerValue>({})
  const [rightAnswersValue, setRightAnswersValue] = useState<number>(0)
  const [isGetRightAnswers, setIsGetRightAnswers] = useState<boolean>(false)

  const onChange = (question: string, value: number) => {
    setSelectedValues((prev: SelectedAnswerValue) => ({
      ...prev,
      [question]: value,
    }))
  }

  const resetTest = () => {
    setRightAnswersValue(0)
    setIsGetRightAnswers(false)
  }

  return (
    <>
      <div className="flex flex-col">
        <H1Custom className="!mb-0" value={test?.title ?? ''} />
        <h3 className="mt-6 text-gray-500">{test?.owner}</h3>
        {test?.data.map((item, index) => (
          <div
            className="my-4 border border-gray-300 p-4 rounded-xl"
            key={index}
          >
            <p className="!text-xl">{item.question}</p>
            <Radio.Group
              onChange={(e) => onChange(item.question, e.target.value)}
              className="!flex !flex-col !mt-4"
              options={item.answers.map((answer) => ({
                value: answer.value,
                label: (
                  <p
                    style={{
                      borderColor: isGetRightAnswers
                        ? `${answer.color}`
                        : 'var(--color-gray-300)',
                    }}
                    className="border my-3 p-2 rounded-[4px]"
                  >
                    {answer.content}
                  </p>
                ),
              }))}
            />
          </div>
        ))}
      </div>
      {test?.data && (
        <Button
          disabled={test?.data.length !== Object.keys(selectedValues).length}
          className="!mt-4"
          onClick={() => {
            setIsGetRightAnswers(true)
            setRightAnswersValue(
              getNumberCorrectAnswers(test.data, selectedValues),
            )
          }}
        >
          Далее
        </Button>
      )}
      <h3 className="mt-6">
        Итоговый результат: {rightAnswersValue} / {test?.data.length}
      </h3>
      <Button
        className="mt-2"
        onClick={resetTest}
        disabled={!isGetRightAnswers}
      >
        Сбросить
      </Button>
    </>
  )
}
