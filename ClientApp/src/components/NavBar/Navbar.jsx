import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "antd";
import "./Navbar.css";
import { UserOutlined, FormOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const items = [
  [UserOutlined, "Мой профиль"],
  [FormOutlined, "Мои задачи"],
].map((nav, index) => ({
  key: String(index + 1),
  icon: React.createElement(nav[0]),
  label: `${nav[1]}`,
}));

export default function NavBar() {
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
        defaultSelectedKeys={["4"]}
        items={items}
      />
    </Sider>
  );
}
