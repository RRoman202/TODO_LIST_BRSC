import React from "react";
import { Button, Form, Input, DatePicker, Cascader } from "antd";
import { optionsPriority } from "../Todo";
import dayjs from "dayjs";

const { TextArea } = Input;

const dateFormat = "YYYY/MM/DD";

const UpdateTaskModal = ({ updateTask, task }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <Form
        onFinish={updateTask}
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
          name="uname"
          initialValue={task.name}
          rules={[
            {
              required: true,
              message: "Введите название задачи",
            },
          ]}
        >
          <Input
            id="uname"
            placeholder="Название"
            onChange={(e) => (task.name = e.target.value)}
          ></Input>
        </Form.Item>
        <Form.Item
          label="Описание"
          rules={[
            {
              required: true,
              message: "Введите название задачи",
            },
          ]}
          initialValue={task.description}
        >
          <TextArea
            id="udescription"
            rows={4}
            placeholder="Описание"
            defaultValue={task.description}
            onChange={(e) => (task.description = e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Срок выполнения"
          name="uterm"
          initialValue={dayjs(task.term, dateFormat)}
          rules={[
            {
              required: true,
              message: "Выберите срок выполнения",
            },
          ]}
        >
          <DatePicker
            id="uterm"
            placeholder="Выберите срок"
            onChange={(e) => {
              task.term = new Date(e);
            }}
          ></DatePicker>
        </Form.Item>
        <Form.Item
          label="Приоритет"
          name="upriority"
          rules={[
            {
              required: true,
              message: "Введите приоритет задачи",
            },
          ]}
          initialValue={task.priority}
        >
          <Cascader
            id="upriority"
            placeholder="Приоритет"
            onChange={(e) => {
              document.querySelector("#priority").value = e;
              task.priority = document.querySelector("#priority").value;
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
            Изменить
          </Button>
        </Form.Item>
      </Form>
      <input id="priority" style={{ visibility: "collapse" }}></input>
    </div>
  );
};

export default UpdateTaskModal;
