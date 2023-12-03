import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Moment from "moment";
import "moment/locale/ru";
import dayjs from "dayjs";
import { Card, Checkbox, Button, Tooltip, Form, Input, DatePicker } from "antd";
import "../Todo/static/css/Todo.css";
import Meta from "antd/es/card/Meta";
import UpdateTaskModal from "./Modals/UpdateTaskModal";

const { TextArea } = Input;
const dateFormat = "YYYY/MM/DD";

const TaskItem = ({ task, deleteAction, updateAction }) => {
  return (
    <Card
      title={<h4 className="title-task">{task.name}</h4>}
      style={{
        margin: 20,
      }}
      actions={[
        <UpdateTaskModal
          ModalContent={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Form
                onFinish={() => updateAction(task.id, task)}
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
                    onChange={(e) => (task.term = e.target.value)}
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
                  <Input
                    id="upriority"
                    placeholder="Приоритет"
                    onChange={(e) => (task.priority = e.target.value)}
                  ></Input>
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
            </div>
          }
        ></UpdateTaskModal>,
        <Tooltip title="Удалить">
          <Button
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => deleteAction(task.id)}
            danger
          ></Button>
        </Tooltip>,
      ]}
      extra={<Checkbox></Checkbox>}
    >
      <p className="task-description">{task.description}</p>
      <Meta
        description={`Срок выполнения: до ${Moment(new Date(task.term)).format(
          "D MMMM Y"
        )}`}
      ></Meta>
    </Card>
  );
};

export default TaskItem;
