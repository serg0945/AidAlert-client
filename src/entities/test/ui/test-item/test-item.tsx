import {
  getNumberCorrectAnswers,
  SelectedAnswerValue,
} from '@/entities/test/lib'
import { useGetTestOneQuery } from '@/entities/test/model'
import { useParams } from '@tanstack/react-router'
import { Button, Radio } from 'antd'
import { FC, useState } from 'react'

export const TestItem: FC = () => {
  const { _id } = useParams({ strict: false })
  const { data: test } = useGetTestOneQuery({ _id })
  const [selectedValues, setSelectedValues] = useState<SelectedAnswerValue>({})
  const [rightAnswersValue, setRightAnswersValue] = useState<number>(0)
  const [isGetRightAnswers, setIsGetRightAnswers] = useState<boolean>(false)

  const onChange = (itemId: string, value: number) => {
    setSelectedValues((prev: SelectedAnswerValue) => ({
      ...prev,
      [itemId]: value,
    }))
  }

  const resetTest = () => {
    setRightAnswersValue(0)
    setIsGetRightAnswers(false)
  }

  return (
    <div className="flex flex-col">
      <h1>Тест</h1>
      <h3 className="mt-6">Автор: {test?.title}</h3>
      <h3 className="mt-2">Название: {test?.title}</h3>
      {test?.data.map((item) => (
        <div
          className="my-4 border border-gray-300 p-4 rounded-xl"
          key={item._id}
        >
          <p>{item.question}</p>
          <Radio.Group
            onChange={(e) => onChange(item._id, e.target.value)}
            className="!flex !flex-col !mt-4 !accent-amber-700"
            options={item.answers.map((answer) => ({
              value: answer.value,
              label: (
                <p
                  style={{
                    borderColor: isGetRightAnswers
                      ? answer.color
                      : 'var(--color-gray-400)',
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
      {test?.data && (
        <Button
          disabled={test?.data.length !== Object.keys(selectedValues).length}
          className="mt-5"
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
      <p>
        {rightAnswersValue} / {test?.data.length}
      </p>
      <Button
        className="mt-2"
        onClick={resetTest}
        disabled={!isGetRightAnswers}
      >
        Сбросить
      </Button>
    </div>
  )
}
