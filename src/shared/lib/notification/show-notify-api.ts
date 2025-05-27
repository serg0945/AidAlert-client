import { notify } from '@/shared/lib/notification/notification'

export const showNotifyApi = async (
  queryFulfilled: any,
  success = 'Успешно',
  error = 'Ошибка',
) => {
  try {
    await queryFulfilled
    notify(success)
    sessionStorage.setItem('isShowAdminNav', 'true')
  } catch {
    notify(error)
  }
}
