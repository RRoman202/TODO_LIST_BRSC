import React, { useState } from "react";
import { Button, Form, Input, DatePicker, Cascader, Modal } from "antd";
import { optionsPriority } from "../Helpers/OptionsPriority";
import { getTasks } from "../FetchData/GetTasks";
import { disabledDate } from "../Helpers/DateDelete";
const { TextArea } = Input;

const AddTaskModal = ({ addTask, setTask }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const showCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const handleCancel = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <>
      <Button
        className="addtask-button"
        onClick={showCreateModal}
        type="primary"
      >
        Создать задачу
      </Button>

      <Modal
        title="Создание задачи"
        open={isCreateModalOpen}
        onCancel={handleCancel}
        okText="Создать"
        cancelText="Отмена"
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
            onFinish={async () => {
              addTask();
              const posts = await getTasks();
              setTask(posts);
              setIsCreateModalOpen(false);
            }}
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
              label="Название"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Введите название задачи",
                },
              ]}
            >
              <Input id="name" placeholder="Название"></Input>
            </Form.Item>
            <Form.Item
              label="Описание"
              rules={[
                {
                  required: true,
                  message: "Введите название задачи",
                },
              ]}
            >
              <TextArea id="description" rows={4} placeholder="Описание" />
            </Form.Item>
            <Form.Item
              label="Срок выполнения"
              name="term"
              rules={[
                {
                  required: true,
                  message: "Выберите срок выполнения",
                },
              ]}
            >
              <DatePicker
                disabledDate={disabledDate}
                id="term"
                placeholder="Выберите срок"
              ></DatePicker>
            </Form.Item>
            <Form.Item
              label="Приоритет"
              name="priority"
              rules={[
                {
                  required: true,
                  message: "Введите приоритет задачи",
                },
              ]}
            >
              <Cascader
                id="priority2"
                placeholder="Приоритет"
                onChange={(e) => {
                  document.querySelector("#priority").value = e;
                }}
                options={optionsPriority}
              ></Cascader>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Создать
              </Button>
            </Form.Item>
          </Form>
          <input id="priority" style={{ visibility: "collapse" }}></input>
        </div>
      </Modal>
    </>
  );
};

export default AddTaskModal;
