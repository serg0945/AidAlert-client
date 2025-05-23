import { AppState } from '@/app/redux'
import {
  TestItemAnswer,
  TestItemData,
  useCreateTestMutation,
  useGetTestOneQuery,
  usePutTestMutation,
} from '@/entities/test'
import { useParams } from '@tanstack/react-router'
import { Button, Input } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const TestItemAdmin: FC = () => {
  const { _id } = useParams({ strict: false })
  const { data: test } = useGetTestOneQuery({ _id }, { skip: !_id })
  const [save] = useCreateTestMutation()
  const [put] = usePutTestMutation()
  const [data, setData] = useState<Omit<TestItemData, '_id'>[]>([])
  const [title, setTitle] = useState<string>('')
  const [valueCounter, setValueCounter] = useState(1)
  const [owner, setOwner] = useState<string>('')
  const selectedCategoryId = useSelector(
    (state: AppState) => state.category.selectedCategoryId,
  )

  const isCreate = _id === undefined

  const addBlock = () => {
    setData([...data, { question: '', answers: [] }])
  }

  useEffect(() => {
    if (test) {
      setTitle(test.title ?? '')
      setData(test.data ?? [])
      const initialCounter = test.data.reduce((max, block) => {
        const maxValue = block.answers.reduce(
          (maxVal, answer) => Math.max(maxVal, answer.value),
          0,
        )
        return Math.max(max, maxValue)
      }, 0)
      setValueCounter(initialCounter + 1)
    }
  }, [test])

  const addQuestion = (index: number) => {
    const newAnswer = {
      content: '',
      isTrue: false,
      color: 'red',
      value: valueCounter,
    }

    const newData = [...data]
    newData[index].answers.push(newAnswer)
    setData(newData)
    setValueCounter(valueCounter + 1)
  }

  const handleBlockChange = (index: number, value: string) => {
    const newData = [...data]
    newData[index].question = value
    setData(newData)
  }

  const handleAnswerChange = (
    blockIndex: number,
    answerIndex: number,
    field: keyof TestItemAnswer,
    value: string | boolean,
  ) => {
    const newData = [...data]

    switch (field) {
      case 'value':
        newData[blockIndex].answers[answerIndex][field] = +value as number
        break
      case 'content':
      case 'color':
        newData[blockIndex].answers[answerIndex][field] = value as string
        break
      case 'isTrue':
        newData[blockIndex].answers.forEach(
          (answer: TestItemAnswer, index: number) => {
            answer.isTrue = index === answerIndex
          },
        )
        break
    }

    setData(newData)
  }

  const handleSaveTest = () => {
    const payload = {
      ...{ data, title, owner },
      categoryId: isCreate ? selectedCategoryId : test?.categoryId,
    }
    isCreate ? save(payload) : put({ ...payload, _id })
  }

  return (
    <div className="mt-8 border p-4 flex flex-col gap-4 rounded-xl border-gray-300">
      <Input
        className="pb-2"
        onChange={(e) => setTitle(e.target.value)}
        addonBefore="Заголовок"
        value={title}
      />
      <Input
        className="border-b-2 pb-4"
        onChange={(e) => setOwner(e.target.value)}
        addonBefore="Автор"
        value={owner}
      />
      {data?.map((block, blockIndex) => (
        <div key={blockIndex} className="border p-4 rounded-xl border-gray-300">
          <Input
            type="text"
            placeholder="Введите ответ"
            value={block.question}
            onChange={(e) => handleBlockChange(blockIndex, e.target.value)}
            addonBefore="Вопрос"
          />
          {block.answers.map((answer: TestItemAnswer, answerIndex: number) => (
            <div key={answerIndex} className="flex mt-4 gap-6">
              <Input
                placeholder="Введите ответ"
                value={answer.content}
                onChange={(e) =>
                  handleAnswerChange(
                    blockIndex,
                    answerIndex,
                    'content',
                    e.target.value,
                  )
                }
                addonBefore="Ответ"
              />
              <Input
                type="radio"
                className="cursor-pointer max-w-6 accent-emerald-600"
                checked={answer.isTrue}
                name={`block-${blockIndex}-answers`}
                onChange={() =>
                  handleAnswerChange(blockIndex, answerIndex, 'isTrue', true)
                }
              />
            </div>
          ))}
          <Button className="my-4" onClick={() => addQuestion(blockIndex)}>
            Добавить ответ
          </Button>
        </div>
      ))}
      <div className="pt-4 flex justify-between">
        <Button onClick={addBlock}>Добавить блок</Button>
        <Button onClick={handleSaveTest}>Сохранить тест</Button>
      </div>
    </div>
  )
}
