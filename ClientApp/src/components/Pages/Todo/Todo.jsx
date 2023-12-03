import React, { useState, useEffect } from "react";
import "moment/locale/ru";
import { Layout, Button, Modal } from "antd";
import "../Todo/static/css/Todo.css";
import NavBar from "../../NavBar/Navbar";
import AddTaskModal from "./Modals/AddTaskModal";
import TaskItem from "./TaskItem";
const { Header, Content } = Layout;

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

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Layout hasSider>
      <NavBar></NavBar>
      <Layout className="site-layout">
        <Header className="header">
          <Button type="primary" className="auth-button">
            Войти
          </Button>
        </Header>

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
          onOk={addTask}
          onCancel={handleCancel}
          okText="Создать"
          cancelText="Отмена"
          footer={null}
        >
          <AddTaskModal addTask={addTask}></AddTaskModal>
        </Modal>
        <Content className="content">
          <div>
            {allTask.map((x) => (
              <TaskItem
                task={x}
                deleteAction={() => deleteTask(x.id)}
              ></TaskItem>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Todo;
