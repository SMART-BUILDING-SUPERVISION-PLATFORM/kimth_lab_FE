import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input } from "antd";

const SignInInput = ({ type, placeholder, name, form, setForm }) => {
  return (
    <Input
      onChange={(e) => {
        const { value } = e.target;
        setForm({
          ...form,
          [name]: value,
        });
        console.log(form);
      }}
      className="loginInput"
      prefix={
        type === "user" ? (
          <UserOutlined type={type} style={{ color: "rgba(0, 0, 0, 0.25)" }} />
        ) : (
          <LockOutlined type={type} style={{ color: "rgba(0, 0, 0, 0.25)" }} />
        )
      }
      placeholder={placeholder}
    />
  );
};

export default SignInInput;
