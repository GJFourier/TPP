import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByUserId } from "../service/UserService";
import { IUser } from "../interface";
import { Avatar, Button, Card, Form, Input, Typography } from "antd";
import { Cookies } from "react-cookie";
import Title from "antd/es/typography/Title";
import { useForm } from "antd/es/form/Form";
import { backendServer } from "../service/ServiceConst";

// const defaultUser: IUser = {
//     email: null,
//     phone: null,
//     username: "",
//     id: 0,
//     name: "AAA",
//     description: "This is default user",
//     avatar:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7lV3zRlxBCfaRa42lSypTSPSrh0GT3yW6uA&usqp=CAU"
// };
const UserProfile = () => {
  const { id } = useParams(); // 从URL中获取id参数
  const [user, setUser] = useState<IUser | null>(null);
  const [fetchingUser, setFetchingUser] = useState(true);
  const cookie = new Cookies();
  const [form] = useForm();
  useEffect(() => {
    const fetchUser = async () => {
      if (!fetchingUser) return;
      try {
        // setUser(cookie.get("currentUser"));
        fetch(backendServer + "/user/" + id)
          .then(async (responseJson) => {
            return await responseJson.json();
          })
          .then((response) => {
            setFetchingUser(false);
            if (response) {
              setUser(response);
            }
          });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
    // setUser(defaultUser);
  }, [id, fetchingUser]);
  useEffect(() => {
    if (user) form.setFieldsValue(user);
  }, [user, form]);
  const handleFinish = (values: any) => {
    let newUser: IUser = structuredClone(user);
    newUser.name = values.name;
    newUser.email = values.email;
    newUser.phone = values.phone;
    newUser.description = values.description;
    newUser.avatar = values.avatar;
    fetch(backendServer + "/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then(async (responseString) => {
        return await responseString.json();
      })
      .then((response) => {
        if (response) setFetchingUser(true);
        else form.setFieldsValue(user);
      });
  };
  const handleReset = () => {
    form.setFieldsValue(user);
  };
  if (!user) {
    return <div>Loading...</div>;
  }
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <Typography>
      <Title level={2}>个人信息</Title>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item label="名字" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="邮箱" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="手机" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="个性签名" name="description">
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button onClick={handleReset}>取消</Button>
        </Form.Item>
      </Form>
    </Typography>
  );
};

export default UserProfile;
