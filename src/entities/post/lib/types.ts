export interface PostItemData {
  title: string
  owner: string
  imageFileNames: string[]
  content: string[]
  _id: string
}

export interface PostTitleProps {
  _id: string
  title: string
}

export interface EditPost {
  _id: string
  body: FormData
}
