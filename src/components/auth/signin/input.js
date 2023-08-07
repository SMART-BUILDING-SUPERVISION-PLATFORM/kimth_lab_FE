import styled from "@emotion/styled";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";

const InputContainer = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  margin-top: 10px;
  transition: all 0.3s ease-in-out;
  box-shadow: inset 0 0 5px ${({ isFocus }) => (isFocus ? "black" : "white")};
  border-radius: 5px;
  .loginInput {
    width: calc(100% - 40px);
    background-color: transparent;
    padding: 0;
    margin: 0;
    border: none;
    height: 40px;
    font-size: 15px;
    ::placeholder {
      transition: all 0.3s ease-in-out;
      opacity: ${({ isFocus }) => (isFocus ? 0 : 1)};
    }
    &:focus {
      outline: none;
    }
  }
`;

const SignInInput = ({ type, placeholder, name, form, setForm }) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <InputContainer isFocus={isFocus}>
      {type === "user" ? (
        <UserOutlined
          style={{
            fontSize: "20px",
            margin: "0 10px",
            color: "#757575",
          }}
          type={type}
        />
      ) : (
        <LockOutlined
          style={{
            fontSize: "20px",
            margin: "0 10px",
            color: "#757575",
          }}
          type={type}
        />
      )}
      <input
        className="loginInput"
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(e) => {
          const { value } = e.target;
          setForm({
            ...form,
            [name]: value,
          });
        }}
        type={name}
      />
    </InputContainer>
  );
};

export default SignInInput;
