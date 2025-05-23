export interface TestItemAnswer {
  value: number
  content: string
  isTrue: boolean
  color: string
  _id?: string
}

export interface TestItemData {
  answers: TestItemAnswer[]
  question: string
  _id: string
}

export interface Test {
  data: Omit<TestItemData, '_id'>[]
  title: string
  owner: string
  categoryId?: string
  _id: string
}

export interface TestOne extends Test {
  data: TestItemData[]
}

export interface SelectedAnswerValue {
  [key: string]: number
}
