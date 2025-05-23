import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RadioState {
  selectedCategoryId: string
}

const initialState: RadioState = {
  selectedCategoryId: '',
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategoryId: (state, action: PayloadAction<string>) => {
      state.selectedCategoryId = action.payload
    },
  },
})

export const { setSelectedCategoryId } = categorySlice.actions
