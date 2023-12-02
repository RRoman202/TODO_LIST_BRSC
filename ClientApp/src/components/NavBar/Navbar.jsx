import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "antd";
import "./Navbar.css";
import { UserOutlined, FormOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const items = [
  [UserOutlined, "Мой профиль", "/profile"],
  [FormOutlined, "Мои задачи", "/"],
].map((nav) => ({
  key: nav[2],
  icon: React.createElement(nav[0]),
  label: `${nav[1]}`,
}));

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <p className="name">ToDoList</p>
      <Menu
        theme="dark"
        mode="inline"
        items={items}
        onClick={({ key }) => {
          navigate(key);
        }}
        defaultSelectedKeys={[window.location.pathname]}
      />
    </Sider>
  );
}
