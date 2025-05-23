import { FC } from 'react'
import { toast } from 'react-toastify'

export interface NotificationProps {
  title?: string
  payload?: string
  status?: 'success' | 'error'
}

export const Notification: FC<NotificationProps> = ({ title, payload }) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <h4 className="croogla-secondary-title">{title}</h4>
      </div>
      {payload && <p className="source-main">{payload}</p>}
    </>
  )
}

export const notify = (
  title?: string,
  payload?: string,
  status?: 'success' | 'error',
) => {
  toast(<Notification title={title} payload={payload} status={status} />)
}
