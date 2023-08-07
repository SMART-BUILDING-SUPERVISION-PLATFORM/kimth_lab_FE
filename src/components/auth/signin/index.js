import styled from "@emotion/styled";
import { Form, Button } from "antd";
import { useNavigate } from "react-router-dom";
import SignInInput from "./input";
import BottomBtn from "./btn";
import { useEffect, useState } from "react";
import useApi, { FETCH_HOST, HOST } from "../../hooks/api/axiosInterceptor";
import { CodeSandboxOutlined } from "@ant-design/icons";

const SignContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease-in 0.7s;
  opacity: ${({ isLoginSuccess }) => (isLoginSuccess ? 0 : 1)};
  background-color: rgba(0, 0, 0, 0.15);
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
    font-weight: bold;
    transition: color 0.3s linear;
    color: ${({ iconColor }) => iconColor};
    transform: translateY(-80px);
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    color: white;
    transform: translateY(-45px);
    animation: 3.5s identifier ease-in-out;
    @keyframes identifier {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }

  .signinForm {
    width: 300px;
  }
  .submitBtn {
    width: 300px;
    margin-bottom: 10px;
    size: 15px;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
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
    className: "signup",
    to: "/auth/signup",
    textValue: "Sign up",
  },
  {
    className: "forgot",
    to: "/auth/forgot",
    textValue: "Forgot Password?",
  },
];

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      await useApi.post(`${HOST}/api/crew/auth/sign-in`, form);
      setIsLoginSuccess(true);
      setTimeout(() => {
        navigate("/home");
      }, 1300);
    } catch (err) {
      const { code } = err.response.data;
      if (code === -401) {
        setIsLoginFailed(true);
        setTimeout(() => {
          setIsLoginFailed(false);
        }, 800);
      } else if (code === -411) {
        alert("승인되지 않은 계정입니다.");
      } else if (code === -423) {
        alert("계정이 존재하지 않습니다. 회원가입을 시도해주세요.");
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await fetch(`${FETCH_HOST}/api/crew/auth/check`, {
          method: "GET",
          // credentials: "include",
        });

        if (status === 403) window.location.href = "/home";
      } catch (err) {
        const { code } = err.response.data;
        console.log(code);
      }
    })();
  }, []);

  return (
    <SignContainer
      iconColor={isLoginFailed ? "red" : isLoginSuccess ? "#39F614" : "white"}
      isLoginSuccess={isLoginSuccess}
    >
      <div className="icon">
        <CodeSandboxOutlined />
      </div>
      <span className="title">SMART BUILDING SUPERVISION PLATFORM</span>
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
