import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormRow from "../component/LogRegForm/FormRow";
import "../css/login.css";
import { message } from "antd";
import { login } from "../service/UserService";
import { Cookies } from "react-cookie";
import { IUser } from "../interface";
const initialState = {
  username: "",
  email: "",
  password: "",
  isMember: true,
};

function LogView() {
  const cookie = new Cookies();

  const [values, setValues] = useState(initialState);

  function handleChange(e: { target: { name: any; value: any } }) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleLog() {
    navigate("/ticketBooking/");
  }

  const navigate = useNavigate();

  function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const { username, password, isMember } = values;
    if (!password || (!isMember && !username)) {
      message.error("用户名或密码为空");
      return;
    } else {
      login(username, password).then((res: IUser) => {
        console.log(res);
        if (res !== undefined) {
          cookie.set("currentUser", {
            id: res.id,
            name: res.name,
            description: res.description,
            avatar: res.avatar,
          });
          message.success("登录成功");
          navigate("/ticketBooking/home");
        } else {
          message.error("登录失败");
        }
      });
    }

    // const callback = (data: { status: number; data: any; msg: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined; }) => {
    //     if(data.status >= 0){
    //         localStorage.setItem("user", JSON.stringify(data.data));
    //         toast.success("login success");
    //         navigate("/");
    //         const encryptedUser = btoa(JSON.stringify(data.data));
    //         document.cookie = `user=${encryptedUser}; expires=0; path=/; SameSite=Strict; Secure`;
    //     }else{
    //         toast.error(data.msg);
    //     }
    // }
    //
    // userService.login({username, password}, callback);
  }

  return (
    <div className="LoginView">
      <form className="form" onSubmit={onSubmit}>
        {/* Logo */}
        <h3 className="login-title">登录</h3>
        {/* name */}
        <FormRow
          type="text"
          name="username"
          label="用户名"
          value={values.username}
          handleChange={handleChange}
        />
        {/* password */}
        <FormRow
          type="password"
          name="password"
          label="密码"
          value={values.password}
          handleChange={handleChange}
        />
        {/* button */}
        <button type="submit" className="login-btn btn" onClick={onSubmit}>
          登录
        </button>
        <p className="login-text">
          还不是用户?
          <button
            type="button"
            onClick={() => {
              setValues(initialState);
              navigate("/Register");
            }}
            className="member-btn"
          >
            注册
          </button>
        </p>
      </form>
    </div>
  );
}

export default LogView;
