import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'

export const AuthForm = () => {
  const [form] = useForm()
  return (
    <Form form={form}>
      <Form.Item name="name" label="Название">
        <Input />
      </Form.Item>
    </Form>
  )
}
