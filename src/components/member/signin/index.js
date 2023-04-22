import styled from "@emotion/styled";
import { UserOutlined, LockOutlined } from "@ant-design/icons"; // npm install --save @ant-design/icons
import { Input, Form, Button } from "antd";
import { Navigate } from "react-router-dom";

const SignContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .signinForm {
    width: 300px;
  }
  .loginInput {
    margin-top: 10px;
    height: 40px;
  }
  .submitBtn {
    width: 300px;
    margin-top: 25px;
    margin-bottom: 10px;
    size: 15px;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  color: #4b4b4b;
  justify-content: space-between;
  font-size: 13px;
`;

const SignIn = () => {
  return (
    <SignContainer>
      <Form className="signinForm">
        <Input
          className="loginInput"
          prefix={
            <UserOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} />
          }
          placeholder="Email"
        />
        <Input
          lassName="loginInput"
          prefix={
            <LockOutlined type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
          }
          placeholder="Password"
        />
      </Form>
      <Button className="submitBtn" type="primary" htmlType="submit">
        Log in
      </Button>
      <Bottom>
        <span
          className="forgot"
          onClick={() => {
            Navigate("/member/forgot");
          }}
        >
          Forgot Password?
        </span>
        <span
          className="signup"
          onClick={() => {
            Navigate("/member/signup");
          }}
        >
          Sign Up
        </span>
      </Bottom>
    </SignContainer>
  );
};

export default SignIn;
