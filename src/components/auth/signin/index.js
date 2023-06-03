import styled from "@emotion/styled";
import { Form, Button } from "antd";
import { useNavigate } from "react-router-dom";
import SignInInput from "./input";
import BottomBtn from "./btn";
import { useState } from "react";
import useApi from "../../hooks/api/axiosInterceptor";

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

const signInputvalueList = [
  {
    name: "email",
    type: "user",
    placeholder: "Email",
  },
  {
    name: "password",
    type: "lock",
    placeholder: "Password",
  },
];

const bottomBtnList = [
  {
    className: "forgot",
    to: "/auth/forgot",
    textValue: "Forgot Password?",
  },
  {
    className: "signup",
    to: "/auth/signup",
    textValue: "Sign up",
  },
];

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      await useApi.post("/api/crew/auth/sign-in", form);
      alert("로그인 성공");
      navigate("/");
    } catch (err) {
      const { code } = err.response.data;
      if (code === -401) {
        alert("비밀번호가 일치하지 않습니다.");
      } else if (code === -411) {
        alert("승인되지 않은 계정입니다.");
      } else if (code === -423) {
        alert("계정이 존재하지 않습니다. 회원가입을 시도해주세요.");
      }
    }
  };

  return (
    <SignContainer>
      <Form className="signinForm">
        {signInputvalueList.map(({ name, type, placeholder }) => (
          <SignInInput
            key={name}
            type={type}
            placeholder={placeholder}
            name={name}
            form={form}
            setForm={setForm}
          />
        ))}
        <Button
          className="submitBtn"
          type="primary"
          htmlType="submit"
          style={{ marginTop: 10 }}
          onClick={handleLogin}
        >
          Sign In
        </Button>
      </Form>
      <Bottom>
        {bottomBtnList.map(({ className, to, textValue }) => (
          <BottomBtn
            key={to}
            className={className}
            to={to}
            textValue={textValue}
          />
        ))}
      </Bottom>
    </SignContainer>
  );
};

export default SignIn;
