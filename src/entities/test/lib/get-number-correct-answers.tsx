import { SelectedAnswerValue, TestItemData } from '@/entities/test/lib/types'

export const getNumberCorrectAnswers = (
  data: TestItemData[],
  selectedValues: SelectedAnswerValue,
) => {
  const filteredQuestions = data.flatMap((block) =>
    block.answers.filter((answer) => answer.isTrue === true),
  )
  const matchCount = filteredQuestions.filter((obj) =>
    Object.values(selectedValues).includes(obj.value),
  ).length
  return matchCount
}
