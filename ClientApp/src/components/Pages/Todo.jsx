import React, { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Moment from "moment";
import "moment/locale/ru";
import {
  Layout,
  Card,
  Checkbox,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Tooltip,
} from "antd";
import "./Todo.css";
import NavBar from "../NavBar/Navbar";
import Meta from "antd/es/card/Meta";
const { Header, Content, Footer } = Layout;
const { TextArea } = Input;

const Todo = () => {
  const [allTask, setTask] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const showCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const url = `/api/tasks`;
  const getTasks = async () => {
    const options = {
      method: "GET",
    };
    const result = await fetch(url, options);

    if (result.ok) {
      const posts = await result.json();
      setTask(posts);
      return posts;
    }
    return [];
  };
  const addTask = async () => {
    const nameTask = document.querySelector("#name").value;
    const descriptionTask = document.querySelector("#description").value;
    const termTask = document.querySelector("#term").value;
    const priorityTask = document.querySelector("#priority").value;

    const newTask = {
      userid: 1,
      name: nameTask,
      description: descriptionTask,
      term: new Date(termTask),
      priority: priorityTask,
      isdone: false,
    };

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newTask),
    };
    const result = await fetch(url, options);

    if (result.ok) {
      const post = await result.json();
      allTask.push(post);
      setTask(allTask);
      setIsCreateModalOpen(false);
    }

    return [];
  };
  const handleCancel = () => {
    setIsCreateModalOpen(false);
  };
  const deleteTask = (id) => {
    const options = {
      method: "DELETE",
      headers: new Headers(),
    };
    fetch(url + `/${id}`, options);
    setTask(allTask.filter((x) => x.id !== id));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Layout hasSider>
      <NavBar></NavBar>
      <Layout
        className="site-layout"
        style={{ marginLeft: 200, height: "100vh" }}
      >
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: 0,
          }}
        >
          <Button
            type="primary"
            style={{ right: 0, position: "absolute", marginRight: "10px" }}
          >
            Войти
          </Button>
        </Header>
        <Button
          style={{
            position: "sticky",
            top: "65px",
            zIndex: 1,
            alignItems: "center",
          }}
          onClick={showCreateModal}
          type="primary"
        >
          Создать задачу
        </Button>
        <Modal
          title="Создание задачи"
          open={isCreateModalOpen}
          onOk={addTask}
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
              onFinish={addTask}
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
                <Input id="name"></Input>
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
                <DatePicker id="term" placeholder="Выберите срок"></DatePicker>
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
                <Input id="priority" placeholder="Приоритет"></Input>
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
        </Modal>
        <Content style={{ margin: "24px 16px 0", overflow: "auto" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
            }}
          >
            {allTask.map((x) => (
              <TaskItem
                name={x.name}
                description={x.description}
                deleteAction={() => deleteTask(x.id)}
                term={x.term}
              ></TaskItem>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Todo;

const TaskItem = ({
  id,
  userid,
  name,
  description,
  term,
  priority,
  isdone,
  deleteAction,
  updateAction,
}) => {
  return (
    <Card
      title={
        <h4 style={{ wordBreak: "break-all", whiteSpace: "normal" }}>{name}</h4>
      }
      style={{
        margin: 20,
      }}
      actions={[
        <Tooltip title="Редактировать">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
          ></Button>
        </Tooltip>,
        <Tooltip title="Удалить">
          <Button
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => deleteAction(id)}
            danger
          ></Button>
        </Tooltip>,
      ]}
      extra={<Checkbox></Checkbox>}
    >
      <p style={{ wordBreak: "break-all", whiteSpace: "normal" }}>
        {description}
      </p>
      <Meta
        style={{ color: "white" }}
        description={`Срок выполнения: до ${Moment(new Date(term)).format(
          "D MMMM Y"
        )}`}
      ></Meta>
    </Card>
  );
};
