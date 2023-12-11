import React, { useState } from "react";
import { Modal, Button, Space, Spin } from "antd";
import { Form, Input } from "antd";

const RegisterModal = ({ isVisible, onCancel }) => {
  const url = `/api/users/register`;
  const [spinning, setSpinning] = React.useState(false);

  const addUser = async () => {
    setSpinning(true);
    const nameUser = document.querySelector("#regname").value;
    const passwordUser = document.querySelector("#regpassword").value;

    const newUser = {
      username: nameUser,
      passwordhash: passwordUser,
    };

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newUser),
    };
    const result = await fetch(url, options);

    if (result.ok) {
      setAuthModal(false);
    }
    setSpinning(false);
  };

  const [isAuthModal, setAuthModal] = useState(isVisible);

  const showAuthModal = () => {
    setAuthModal(true);
  };

  const handleCancel = () => {
    setAuthModal(false);
  };

  return (
    <>
      <Button onClick={showAuthModal}>Зарегистрироваться</Button>
      <Modal
        title="Регистрация"
        open={isAuthModal}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Form
            onFinish={addUser}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Логин"
              name="regname"
              rules={[
                {
                  required: true,
                  message: "Введите логин",
                },
              ]}
            >
              <Input id="regname" placeholder="Логин"></Input>
            </Form.Item>
            <Form.Item
              label="Пароль"
              name="regpassword"
              rules={[
                {
                  required: true,
                  message: "Введите пароль",
                },
              ]}
            >
              <Input.Password id="regpassword" placeholder="Пароль" />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Space wrap>
                <Button type="primary" htmlType="submit">
                  Зарегистрироваться
                </Button>
                <Spin spinning={spinning} />
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default RegisterModal;
