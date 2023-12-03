import React, { useState } from "react";
import { Button, Form, Input, DatePicker, Modal, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const UpdateTaskModal = ({ ModalContent }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCancel = () => {
    setShowModal(false);
  };

  const handeShowModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <Tooltip title="Редактировать">
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={handeShowModal}
        ></Button>
      </Tooltip>

      <Modal
        title="Редактирование задачи"
        open={showModal}
        onCancel={handleCancel}
        okText="Применить"
        cancelText="Отмена"
        footer={null}
      >
        {ModalContent}
      </Modal>
    </div>
  );
};

export default UpdateTaskModal;
