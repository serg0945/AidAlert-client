import { Button, Checkbox } from 'antd'
import { FC, useState } from 'react'

interface DeleteConfirmButtonProps {
  title: string
  selectedId: string | undefined
  className?: string
  onClick: () => void
}

export const DeleteConfirmButton: FC<DeleteConfirmButtonProps> = ({
  title,
  selectedId = '',
  className = '',
  onClick,
}) => {
  const [isConfirm, setIsConfirm] = useState<boolean>(false)

  return (
    <>
      <div className={'flex gap-2 items-center mt-4' + className}>
        <Button
          disabled={!(isConfirm === true && selectedId !== '')}
          onClick={onClick}
        >
          Удалить {title}
        </Button>
        <Checkbox onChange={(e) => setIsConfirm(e.target.checked)}>
          Подтвердите
        </Checkbox>
      </div>
    </>
  )
}
