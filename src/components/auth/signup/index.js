import styled from "@emotion/styled";
import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import useApi from "../../hooks/api/axiosInterceptor";
import Modal from "./companyListModal";
import { useNavigate } from "react-router-dom";
import {
  CheckOutlined,
  FontSizeOutlined,
  HomeOutlined,
  LoadingOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  SendOutlined,
} from "@ant-design/icons";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 320px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  margin-top: 10px;
  box-shadow: inset 0 0 5px white;
  border-radius: 5px;
  .loginInput {
    width: calc(100% - 40px);
    background-color: transparent;
    padding: 0;
    margin: 0;
    border: none;
    height: 40px;
    color: white;
    font-size: 15px;
    caret-color: #5fba7d;
    ::placeholder {
      color: rgba(255, 255, 255, 0.9);
    }
    &:focus {
      outline: none;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: inherit;
  margin-bottom: 10px;
  &:nth-of-type(2) {
    margin-top: 10px;
  }
  &:nth-of-type(3) {
    margin-bottom: 0;
  }
  &:nth-of-type(4) {
    margin-bottom: 0;
    margin-top: 10px;
  }
  .innerWrapper {
    width: calc(100% - 60px);
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: black;
    box-shadow: inset 0 0 5px white;
    border-radius: 5px;
    .loginInput {
      width: calc(100% - 40px);
      background-color: transparent;
      padding: 0;
      margin: 0;
      border: none;
      height: 40px;
      color: white;
      font-size: 15px;
      caret-color: #5fba7d;
      ::placeholder {
        color: rgba(255, 255, 255, 0.9);
      }
      &:focus {
        outline: none;
      }
    }
  }
`;

const VerfiyButton = styled.button`
  width: 50px;
  height: 45px;
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #1777ff;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 5px;
  width: 320px;
  height: 35px;
  font-weight: bold;
  cursor: pointer;
  transition: all ease-in 0.2s;
  margin-top: 10px;
  background-color: #1777ff;
  color: white;
  :hover {
    background-color: #4c72aa;
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [companyList, setCompanyList] = useState();
  const [isModalOpen, setModal] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(false);

  const [form, setForm] = useState({
    businessType: "업종",
    companyId: 0,
    email: "",
    name: "",
    number: "",
    password: "",
    validationCode: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onClickCompany = async (e) => {
    e.preventDefault();
    if (companyName === "") {
      alert("회사 이름을 입력해주세요.");
      return;
    }
    try {
      const { data } = await useApi.get("/api/company", {
        params: {
          name: companyName,
        },
      });

      if (data.length === 0) {
        alert("회사 이름을 다시 입력해주세요.");
      } else {
        setCompanyList(data);
        setModal(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCompanyClick = (companyId, companyName) => {
    setForm({
      ...form,
      companyId: companyId,
    });
    setCompanyName(companyName);
    setModal(false);
  };

  const onClickEmail = async (e) => {
    e.preventDefault();

    try {
      setCodeSent(false);
      await useApi.get("/api/crew/auth/email-duplication", {
        params: {
          email: form.email,
        },
      });
      alert(`인증코드가 ${form.email}로 전송되었습니다.`);
      setCodeSent(true);
    } catch (err) {
      const { code, message } = err.response.data;
      if (code <= -400) alert(message);
    }
  };

  const onClickValidateCode = async (e) => {
    e.preventDefault();
    try {
      const req = {
        code: codeInput,
        email: form.email,
      };
      const {
        data: { validationCode },
      } = await useApi.post("/api/crew/auth/validate-code", req);
      setForm({
        ...form,
        validationCode: validationCode,
      });
      alert("인증되었습니다.");
      setCodeInput("");
      setCodeSent(false);
    } catch (err) {
      alert("인증코드가 유효하지 않습니다.");
      setCodeInput("");
      console.error(err);
    }
  };

  const isPasswordSame = (value) => {
    if (value.length > 0 && form.password !== value) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const businessTypeList = [
    { value: "관리자", label: "관리자" },
    { value: "발주처", label: "발주처" },
    { value: "감리사", label: "감리사" },
    { value: "설계사", label: "설계사" },
  ];
  const { Option } = Select;

  const handleSubmit = async () => {
    if (error) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const newPhone =
      form.number.slice(0, 3) +
      "-" +
      form.number.slice(3, 7) +
      "-" +
      form.number.slice(7, 11);

    const newForm = {
      ...form,
      number: newPhone,
    };
    try {
      await useApi.post("/api/crew/auth/sign-up", newForm);

      alert("회원가입 성공");
      navigate("/auth/signin");
    } catch (err) {
      const { code } = err.response.data;
      if (code === -402) {
        // 회사 관리자 이미 존재
        alert(`해당회사의 관리자가 이미 존재합니다.`);
      } else if (code === -403) {
        // 이메일 중복
        alert("이미 사용 중인 이메일입니다.");
      } else if (code === -412) {
        // validationCode 비유효
        alert("인증코드가 유효하지 않습니다.");
      } else if (code === -421) {
        // 회사 미존재
        alert("회사가 존재하지 않습니다.");
      }
    }
  };

  useEffect(() => {}, [form]);
  return (
    <>
      {isModalOpen && (
        <Modal
          companyList={companyList}
          onChange={onChange}
          handleCompanyClick={handleCompanyClick}
          onClose={() => setModal(false)}
        />
      )}
      <Form
        // 입력창에서 엔터 눌렀을 경우 회사리스트 모달 띄움 방지
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <Select
          placeholder="업종구분"
          value={form.businessType}
          style={{
            width: "100%",
            borderRadius: "5px",
          }}
          onChange={(e) => {
            setForm({ ...form, businessType: e });
          }}
        >
          {businessTypeList.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>

        {/* for search & send code */}
        <Wrapper>
          <div className="innerWrapper">
            <HomeOutlined
              style={{
                fontSize: "20px",
                margin: "0 10px",
                color: "white",
              }}
            />
            <input
              className="loginInput"
              name="companyName"
              value={companyName}
              onChange={(e) => {
                const { value } = e.target;
                setCompanyName(value);
              }}
              placeholder="회사명"
            />
          </div>

          <VerfiyButton onClick={onClickCompany}>
            <SearchOutlined />
          </VerfiyButton>
        </Wrapper>
        <Wrapper>
          <div className="innerWrapper">
            <MailOutlined
              style={{
                fontSize: "20px",
                margin: "0 10px",
                color: "white",
              }}
            />
            <input
              className="loginInput"
              name="email"
              value={form.email}
              onChange={(e) => {
                onChange(e);
              }}
              style={{
                width: "245px",
              }}
              placeholder="이메일"
            />
          </div>

          <VerfiyButton onClick={onClickEmail}>
            <SendOutlined />
          </VerfiyButton>
        </Wrapper>
        {codeSent && (
          <Wrapper>
            <div className="innerWrapper">
              <LoadingOutlined
                style={{
                  fontSize: "20px",
                  margin: "0 10px",
                  color: "white",
                }}
              />
              <input
                className="loginInput"
                name="code"
                value={codeInput}
                onChange={(e) => {
                  const { value } = e.target;
                  setCodeInput(value);
                }}
                style={{
                  width: "245px",
                }}
                placeholder="인증코드"
              />
            </div>
            <VerfiyButton onClick={onClickValidateCode}>
              <CheckOutlined
                style={{
                  fontSize: "20px",
                  margin: "0 10px",
                  color: "white",
                }}
              />
            </VerfiyButton>
          </Wrapper>
        )}
        {/* for search & send code */}

        <InputContainer>
          <FontSizeOutlined
            style={{
              fontSize: "20px",
              margin: "0 10px",
              color: "white",
            }}
          />
          <input
            className="loginInput"
            name="name"
            value={form.name}
            onChange={(e) => {
              onChange(e);
            }}
            placeholder="이름"
          />
        </InputContainer>

        <InputContainer>
          <LockOutlined
            style={{
              fontSize: "20px",
              margin: "0 10px",
              color: "white",
            }}
          />
          <input
            className="loginInput"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="비밀번호"
            type="password"
          />
        </InputContainer>

        <InputContainer>
          <LockOutlined
            style={{
              fontSize: "20px",
              margin: "0 10px",
              color: "white",
            }}
          />
          <input
            className="loginInput"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              isPasswordSame(e.target.value);
            }}
            placeholder="비밀번호 확인"
            type="password"
          />
        </InputContainer>

        {error && (
          <span
            style={{
              color: "red",
              fontSize: 13,
              fontWeight: 500,
              marginBottom: 5,
            }}
          >
            비밀번호가 일치하지 않습니다. 다시 입력해주세요.
          </span>
        )}
        <InputContainer>
          <PhoneOutlined
            style={{
              fontSize: "20px",
              margin: "0 10px",
              color: "white",
            }}
          />
          <input
            className="loginInput"
            name="number"
            value={form.number}
            onChange={(e) => {
              onChange(e);
            }}
            placeholder="전화번호 (숫자만 입력해주세요.)"
          />
        </InputContainer>
      </Form>

      <SubmitButton onClick={handleSubmit}>Sign Up</SubmitButton>
    </>
  );
};

export default SignUp;
