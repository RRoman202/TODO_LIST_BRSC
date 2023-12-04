import React, { useState, useEffect } from "react";
import "moment/locale/ru";
import { Layout, Button, Modal, Progress, Space, Segmented } from "antd";
import "../Todo/static/css/Todo.css";
import NavBar from "../../NavBar/Navbar";
import AddTaskModal from "./Modals/AddTaskModal";
import UpdateTaskModal from "./Modals/UpdateTaskModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Moment from "moment";
import "moment/locale/ru";
import { Card, Checkbox, Tooltip } from "antd";
import "../Todo/static/css/Todo.css";
import Meta from "antd/es/card/Meta";

const { Header, Content } = Layout;

export const optionsPriority = [
  {
    value: "Высокий",
    label: "Высокий",
  },
  {
    value: "Средний",
    label: "Средний",
  },
  {
    value: "Низкий",
    label: "Низкий",
  },
];

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
      setTask(posts.sort((a, b) => (a.id > b.id ? 1 : -1)));
      console.log(allTask);
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
      console.log(allTask);
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

  const updateTask = async (id, oldTask) => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const options = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(oldTask),
    };
    await fetch(url + `/${id}`, options);
    const updatedTask = allTask.findIndex((x) => x.id === oldTask.id);
    allTask[updatedTask] = oldTask;
    setTask(allTask.slice());
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
        <Segmented
          className="segment"
          options={["Все задачи", "Не выполненные", "Выполненные"]}
        />
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
                updateAction={() => updateTask(x.id, x)}
              ></TaskItem>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Todo;

const TaskItem = ({ task, deleteAction, updateAction }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const showUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };
  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
  };
  const handleUpdateTask = (taskid, task) => {
    updateAction(taskid, task);
    setIsUpdateModalOpen(false);
  };
  const colorTask = getColorTask(task.priority);
  return (
    <Card
      title={
        <Card
          style={{
            backgroundColor: colorTask[0],
            margin: "10px",
            borderColor: colorTask[2],
            borderWidth: "2px",
          }}
        >
          <h4 className="title-task" style={{ fontSize: "30px" }}>
            {task.name}
          </h4>
        </Card>
      }
      style={{
        margin: 20,
        backgroundColor: colorTask[1],
        borderColor: colorTask[2],
        borderWidth: "3px",
      }}
      actions={[
        <div>
          <Tooltip title="Редактировать">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={showUpdateModal}
            ></Button>
          </Tooltip>

          <Modal
            title="Редактирование задачи"
            open={isUpdateModalOpen}
            onCancel={handleUpdateCancel}
            okText="Применить"
            cancelText="Отмена"
            footer={null}
          >
            <UpdateTaskModal
              updateTask={() => handleUpdateTask(task.id, task)}
              task={task}
            ></UpdateTaskModal>
          </Modal>
        </div>,

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
      extra={
        <Checkbox
          onChange={(e) => {
            task.isDone = e.target.checked;

            updateAction(task.id, task);
          }}
          checked={task.isDone}
        ></Checkbox>
      }
    >
      <Card
        className="task-description"
        style={{
          fontSize: "20px",
          marginBottom: "20px",
          backgroundColor: "white",
        }}
      >
        {task.description}
      </Card>
      <Space
        direction="vertical"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <Space wrap>
          <Meta
            description={`Срок выполнения: до ${Moment(
              new Date(task.term)
            ).format("D MMMM Y")}`}
          ></Meta>
          <Progress
            type="circle"
            percent={Math.ceil(calculatePercentage(new Date(task.term)))}
            size={30}
          />
        </Space>
        <Card
          title="Приоритет"
          size="small"
          style={{ backgroundColor: colorTask[0] }}
        >
          {task.priority}
        </Card>
      </Space>
    </Card>
  );
};

function getColorTask(prior) {
  if (prior === "Высокий") {
    return ["#ff4d4f", "#ffccc7", "#ffa39e"];
  }
  if (prior === "Средний") {
    return ["#ffa940", "#ffe7ba", "#ffd591"];
  }
  if (prior === "Низкий") {
    return ["#bae637", "#f4ffb8", "#eaff8f"];
  }
}

function calculatePercentage(endDate) {
  const today = new Date();

  if (endDate < today) {
    return 100;
  }

  const totalDays = (endDate - today) / (1000 * 60 * 60 * 24) + 1;

  return 100 / totalDays;
}
