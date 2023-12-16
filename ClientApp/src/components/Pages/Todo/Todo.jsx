import React, { useState, useEffect } from "react";
import "moment/locale/ru";
import { Layout, Empty, Spin } from "antd";
import "../Todo/static/css/Todo.css";
import NavBar from "../../NavBar/Navbar";
import AddTaskModal from "./Modals/AddTaskModal";
import "moment/locale/ru";
import "../Todo/static/css/Todo.css";
import { getTasks } from "./FetchData/GetTasks";
import TaskItem from "./TaskItem";

const { Content } = Layout;

const Todo = () => {
  const [allTask, setTask] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [spinning, setSpinning] = React.useState(false);

  const url = `/api/tasks`;

  const getTasksAll = async () => {
    setSpinning(true);
    const posts = await getTasks();
    setTask(posts);
    setSpinning(false);
    return posts;
  };
  const addTask = async () => {
    const nameTask = document.querySelector("#name").value;
    const descriptionTask = document.querySelector("#description").value;
    const termTask = document.querySelector("#term").value;
    const priorityTask = document.querySelector("#priority").value;

    const newTask = {
      userid: localStorage.getItem("userid"),
      name: nameTask,
      description: descriptionTask,
      term: new Date(termTask),
      priority: priorityTask,
      isdone: false,
    };

    const headers = new Headers();

    headers.set("Content-Type", "application/json");
    headers.set("Authorization", "Bearer " + localStorage.getItem("token"));

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
      const posts = await getTasks();
      setTask(posts);
    }

    return [];
  };
  const deleteTask = async (id) => {
    const headers = new Headers();

    headers.set("Authorization", "Bearer " + localStorage.getItem("token"));
    const options = {
      method: "DELETE",
      headers: headers,
    };
    await fetch(url + `/${id}`, options);
    setTask(allTask.filter((x) => x.id !== id));
  };

  const updateTask = async (id, oldTask) => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", "Bearer " + localStorage.getItem("token"));

    const options = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(oldTask),
    };
    await fetch(url + `/${id}`, options);
    const index = allTask.findIndex((x) => x.id === id);
    allTask[index] = oldTask;
    setTask(allTask.slice());
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    if (isLoggedIn) {
      getTasksAll();
    } else {
      setTask([]);
    }
  }, [isLoggedIn]);

  return (
    <Layout>
      <Layout className="site-layout">
        <Spin spinning={spinning} fullscreen />
        <NavBar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}></NavBar>
        {isLoggedIn ? (
          <>
            <AddTaskModal addTask={addTask} setTask={setTask}></AddTaskModal>

            <Content className="content">
              <div>
                {allTask.map((x) => (
                  <TaskItem
                    task={x}
                    deleteAction={() => deleteTask(x.id)}
                    updateAction={() => updateTask(x.id, x)}
                    setTask={setTask}
                  ></TaskItem>
                ))}
              </div>
            </Content>
          </>
        ) : (
          <Empty
            className="empty"
            image="https://avatanplus.com/files/resources/original/5745831bb158a154e788244e.png"
            imageStyle={{ height: 300 }}
            description={
              <span style={{ fontSize: "20px" }}>
                Войдите или зарегистрируйтесь!
              </span>
            }
          ></Empty>
        )}
      </Layout>
    </Layout>
  );
};

export default Todo;
