import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Moment from "moment";
import "moment/locale/ru";
import { Card, Checkbox, Button, Tooltip } from "antd";
import "../Todo/static/css/Todo.css";
import Meta from "antd/es/card/Meta";

const TaskItem = ({ task, deleteAction, updateAction }) => {
  return (
    <Card
      title={<h4 className="title-task">{task.name}</h4>}
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
