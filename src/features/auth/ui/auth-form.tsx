import {
  AuthPayload,
  useAuthorizationMutation,
  useCreateAuthMutation,
} from '@/features/auth'
import { FORM_RULES } from '@/shared/config'
import { Button, Form, Input } from 'antd'
import { FormProps, useForm } from 'antd/es/form/Form'
import { FC } from 'react'

export const AuthForm: FC = () => {
  const [form] = useForm()
  // const [auth] = useAuthorizationMutation()
  const [createAuth] = useCreateAuthMutation()

  const onFinish: FormProps<AuthPayload>['onFinish'] = async (values) => {
    await createAuth({
      ...values,
      //@ts-ignore
      dateLogin: '2025-05-21T21:18:06.861Z',
    }).unwrap()
  }

  return (
    <Form
      name="auth"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      className="flex flex-col h-[100vh] justify-center items-center"
    >
      <Form.Item<AuthPayload> rules={FORM_RULES} label="Логин" name="username">
        <Input />
      </Form.Item>
      <Form.Item<AuthPayload> rules={FORM_RULES} label="Пароль" name="password">
        <Input />
      </Form.Item>
      <Form.Item label={null}>
        <Button loading={false} htmlType="submit" type="primary" size="middle">
          Авторизоваться
        </Button>
      </Form.Item>
    </Form>
  )
}
