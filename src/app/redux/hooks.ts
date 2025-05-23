import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { AppState } from './types'

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
