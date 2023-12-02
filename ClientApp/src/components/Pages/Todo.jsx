import React, { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Layout,
  Card,
  Checkbox,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
} from "antd";
import "./Todo.css";
import NavBar from "../NavBar/Navbar";
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
        />
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
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Input id="name" placeholder="Название"></Input>
            <br></br>
            <TextArea id="description" rows={4} placeholder="Описание" />
            <br></br>
            <DatePicker id="term" placeholder="Выберите срок"></DatePicker>
            <br></br>
            <Input id="priority" placeholder="Приоритет"></Input>
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
              <TaskItem name={x.name} description={x.description}></TaskItem>
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
}) => {
  return (
    <Card
      title={<h4>{name}</h4>}
      style={{
        margin: 20,
      }}
      actions={[
        <Button type="primary" shape="circle" icon={<EditOutlined />}></Button>,
      ]}
      extra={<Checkbox></Checkbox>}
    >
      <p>{description}</p>
    </Card>
  );
};
