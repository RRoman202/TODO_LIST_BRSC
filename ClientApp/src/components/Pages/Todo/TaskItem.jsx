import React, { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Moment from "moment";
import "moment/locale/ru";
import { Card, Checkbox, Button, Tooltip, Flex, Space, Progress } from "antd";
import { calculatePercentage } from "./Helpers/CalculatePercentage";
import "../Todo/static/css/Todo.css";
import Meta from "antd/es/card/Meta";
import UpdateTaskModal from "./Modals/UpdateTaskModal";
import { getColorTask } from "./Helpers/OptionsPriority";
import DeleteModal from "./Modals/DeleteTaskModal";
import { getTasks } from "./FetchData/GetTasks";

const TaskItem = ({ task, deleteAction, updateAction }) => {
  const colorTask = getColorTask(task.priority);

  const [checked, setChecked] = useState(task.isDone);

  const taskCopy = { ...task };

  const labelCheckBox = checked ? "Выполнено" : "В работе";

  return (
    <Card
      size="small"
      style={{
        backgroundColor: colorTask[0],
        margin: "10px",
        marginRight: "10px",
        borderColor: colorTask[2],
        borderWidth: "2px",
      }}
    >
      <Flex justify="space-between" align="center">
        <div></div>
        <h4 className="title-task" style={{ fontSize: "30px" }}>
          {task.name}
        </h4>
        <Space wrap>
          <Card size="small" style={{ width: "220px" }}>
            <Space wrap>
              <Progress
                type="circle"
                percent={Math.ceil(calculatePercentage(new Date(task.term)))}
                size={50}
              />
              <Meta
                description={`До ${Moment(new Date(task.term)).format(
                  "D MMMM Y"
                )}`}
              ></Meta>
            </Space>
          </Card>
          <Card
            size="small"
            style={{ width: "150px" }}
            title={
              <Checkbox
                onChange={(e) => {
                  task.isDone = e.target.checked;
                  setChecked(task.isDone);
                  updateAction(task.id, task);
                }}
                checked={task.isDone}
              >
                {labelCheckBox}
              </Checkbox>
            }
          >
            <Space wrap>
              <UpdateTaskModal
                updateTask={() => updateAction(task.id, task)}
                task={task}
                taskCopy={taskCopy}
              ></UpdateTaskModal>
            </Space>
            <DeleteModal
              deleteTask={() => deleteAction(task.id)}
              task={task}
            ></DeleteModal>
          </Card>
        </Space>
      </Flex>
    </Card>
  );
};

export default TaskItem;
