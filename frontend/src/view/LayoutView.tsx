import React, { useEffect, useState } from "react";
import "../css/LayoutView.css";
import { Dropdown, Image, Layout, Menu, theme } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Outlet, useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const { Header, Content } = Layout;
const { Item } = Menu;
const label: string[] = ["首页", "电影", "影院"];
const item = label.map((_, index) => {
  const url = ["home", "film", "cinema"];
  return {
    key: index + 1,
    label: <Link to={"/ticketBooking/" + url[index]}>{label[index]}</Link>,
  };
});

export function LayoutView() {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const user = cookie.get("currentUser");
  const menu = (
    <Menu>
      <Item
        key="profile"
        onClick={() => {
          navigate("/ticketBooking/user/"+user.id+"/profile");
        }}
      >
        个人中心
      </Item>
      <Item key="logout">
        <Link to={"/login"}>退出登录</Link>
      </Item>
    </Menu>
  );
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  useEffect(() => {
    const newDefaultSelectedKeys: string[] = [];
    const pathname = location.pathname;
    const url = ["home", "film", "cinema"];
    url.forEach((urlKeyWord: string, index: number) => {
      if (pathname.includes(urlKeyWord))
        newDefaultSelectedKeys.push((index + 1).toString());
    });
    setSelectedKeys(newDefaultSelectedKeys);
  }, [location, location.pathname]);

  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          backgroundColor: "black",
        }}
      >
        <div className="logo" style={{ flex: "1" }}>
          <img
            alt=""
            style={{ marginTop: "3px", width: "60px", height: "60px" }}
            src={"/logo.jpg"}
          />
        </div>
        <div className="space" style={{ flex: "3" }} />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{
            flex: "2",
            float: "right",
            backgroundColor: "black",
          }}
          defaultOpenKeys={["1"]}
          defaultSelectedKeys={["1"]}
          selectedKeys={selectedKeys}
          items={item}
        />
        <div className="avatar" style={{ flex: "1", maxHeight: "100%" }}>
          <Dropdown overlay={menu} placement="bottomRight">
            <div className="avatar" style={{ flex: "1", textAlign: "right" }}>
              <Image
                style={{ marginBottom: "5px", width: "60px", height: "60px" }}
                src={user.avatar}
              />
              <DownOutlined style={{ marginLeft: "8px" }} />
            </div>
          </Dropdown>
        </div>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
            display: "flex",
            flexFlow: "column",
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
