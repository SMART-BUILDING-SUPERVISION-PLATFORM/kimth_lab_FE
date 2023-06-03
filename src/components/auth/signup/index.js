import styled from "@emotion/styled";
import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import useApi from "../../hooks/api/axiosInterceptor";
import Modal from "./companyListModal";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 320px;
  .inputtext {
    height: 35px;
    outline: none;
    border: none;
    border-bottom: 0.5px solid #ddd;
    width: inherit;
    margin-bottom: 5px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: inherit;
  margin-bottom: 5px;
  height: 35px;
`;

const VerfiyButton = styled.button`
  padding: 0 10px 0 10px;
  border: none;
  border-radius: 5px;
  width: auto;
  cursor: pointer;
  transition: all ease-in 0.2s;
  :hover {
    color: white;
    background-color: #1777ff;
  }
`;

const SubmitButton = styled.button`
  padding: 0 10px 0 10px;
  border: none;
  border-radius: 5px;
  width: 200px;
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
  const [timer, setTimer] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(false);

  const [form, setForm] = useState({
    businessType: "--- 업종을 선택해 주세요 ---",
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
      setCodeInput("");
      console.error(err);
    }
  };

  // 코드 인증한 시점으로부터 60분안에 가입하도록
  const startTimer = () => {
    const endTime = new Date().getTime() + 1 * 60 * 1000;

    setTimer(
      setInterval(() => {
        const remainingTime = endTime - new Date().getTime();

        if (remainingTime === 0) {
          clearInterval(timer);
          alert(
            "인증 시간이 만료되었습니다. 페이지를 새로고침하고 다시 시도하세요."
          );
          window.location.reload();
        } else if (remainingTime <= 3 * 60 * 1000) {
          alert("인증 시간이 3분 남았습니다. 시간 안에 가입을 완료해주세요.");
        }
      }, 1000)
    );
    return;
  };

  const isPasswordSame = (value) => {
    if (value.length > 0 && form.password !== value) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const businessTypeList = [
    { value: "서비스 관리자", label: "서비스 관리자" },
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

    try {
      await useApi.post("/api/crew/auth/sign-up", form);

      alert("회원가입 성공");
      navigate("/auth/signin");
    } catch (err) {
      const { code } = err.response.data;
      if (code === -402) {
        // 회사 관리자 이미 존재
        alert("회사 관리자가 이미 존재합니다. 다시 시도해주세요.");
      } else if (code === -403) {
        // 이메일 중복
        alert("이미 사용 중인 이메일입니다. 다시 시도해주세요.");
      } else if (code === -412) {
        // validationCode 비유효
        alert("인증코드가 유효하지 않습니다. 다시 시도해주세요");
      } else if (code === -421) {
        // 회사 미존재
        alert("회사가 존재하지 않습니다. 다시 시도해주세요.");
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
          className="inputtext"
          value={form.businessType}
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
          <Input
            className="inputtext"
            name="companyName"
            value={companyName}
            onChange={(e) => {
              const { value } = e.target;
              setCompanyName(value);
            }}
            style={{
              width: "245px",
            }}
            placeholder="회사명"
          />
          <VerfiyButton onClick={onClickCompany}>회사 검색</VerfiyButton>
        </Wrapper>
        <Wrapper>
          <Input
            className="inputtext"
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
          <VerfiyButton onClick={onClickEmail}>코드 전송</VerfiyButton>
        </Wrapper>
        {codeSent && (
          <Wrapper>
            <Input
              className="inputtext"
              name="code"
              value={codeInput}
              onChange={(e) => {
                const { value } = e.target;
                setCodeInput(value);
              }}
              style={{
                width: "245px",
              }}
              placeholder="인증 코드 입력"
            />
            <VerfiyButton
              style={{ minWidth: "70px" }}
              onClick={onClickValidateCode}
            >
              인증하기
            </VerfiyButton>
          </Wrapper>
        )}
        {/* for search & send code */}

        <Input
          className="inputtext"
          name="name"
          value={form.name}
          onChange={(e) => {
            onChange(e);
          }}
          placeholder="이름"
        />

        <Input
          className="inputtext"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="비밀번호"
          type="password"
        />

        <Input
          className="inputtext"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
            isPasswordSame(e.target.value);
          }}
          placeholder="비밀번호 확인"
          type="password"
        />

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
        <Input
          className="inputtext"
          name="number"
          value={form.number}
          onChange={(e) => {
            onChange(e);
          }}
          placeholder="전화번호 (숫자만 입력해주세요.)"
        />
      </Form>

      <SubmitButton onClick={handleSubmit}>Sign Up</SubmitButton>
    </>
  );
};

export default SignUp;
