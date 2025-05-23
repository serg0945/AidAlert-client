import { store } from './store'

export type AppStore = typeof store
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = typeof store.dispatch
