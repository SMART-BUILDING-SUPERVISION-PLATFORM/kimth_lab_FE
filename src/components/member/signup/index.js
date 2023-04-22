import styled from "@emotion/styled";
import { Input, Select } from "antd";
import { useState } from "react";
import useApi from "../../hooks/api/axiosInterceptor";
import Modal from "./companyListModal";

// TODO: passwordConfirm 모듈화
// TODO:

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

const Button = styled.button`
  padding: 0 10px 0 10px;
  border: none;
  border-radius: 5px;
  width: auto;
  cursor: pointer;
  transition: all ease-in 0.2s;
  :hover {
    color: white;
    background-color: #97deff;
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
  :hover {
    color: white;
    background-color: #97deff;
  }
`;

const SignUp = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyList, setCompanyList] = useState();
  const [isModalOpen, setModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [emailInput, setEmailInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeValid, setCodeValid] = useState(false);
  const [timer, setTimer] = useState(null);
  const [businessType, setBusinessType] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [newCode, setNewCode] = useState("");

  const [form, setForm] = useState({
    businessType: "",
    companyId: 0,
    email: "",
    name: "",
    number: "",
    password: "",
    newCode: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await useApi.post("/api/crew/auth/sigh-up", Form);
      console.log(response);

      const { status } = response;

      if (status === 201) {
        // 회원가입 성공 (유저 생성)
        alert("회원가입 성공");
        // TODO: 로그인 페이지로 이동
      } else if (status === -402) {
        // 회사 관리자 이미 존재
        alert("회사 관리자가 이미 존재합니다. 다시 시도해주세요.");
      } else if (status === -403) {
        // 이메일 중복
        alert("이미 사용 중인 이메일입니다. 다시 시도해주세요.");
      } else if (status === -412) {
        // newCode 비유효
        // TODO: alert("???")
      } else if (status === -421) {
        // 회사 미존재
        alert("회사가 존재하지 않습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onClickCompany = async (e) => {
    e.preventDefault();

    try {
      const { data, status } = await useApi.get("/api/company", {
        params: {
          name: companyName,
        },
      });

      // console.log(data, status);

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
    setSelectedCompanyId(companyId);
    setCompanyName(companyName);
    setModal(false);
  };

  const onClickEmail = async (e) => {
    e.preventDefault();
    console.log("코드전송 버튼 클릭");

    try {
      const { status } = await useApi.post(
        "/api/crew/auth/email-duplication",
        emailInput
      );

      // console.log(status);

      if (status === 200) {
        // 코드 전송 성공
        setCodeSent(true);
      } else if (status === -403) {
        // 이메일 중복
        alert("이미 사용 중인 이메일입니다.");
      } else if (status === -501) {
        // 서버 에러
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onClickValidateCode = async (e) => {
    e.preventDefault();

    try {
      const data = {
        code: codeInput,
        email: emailInput,
      };
      const response = await useApi.post("/api/crew/auth/validate-code", data);
      const { status } = response;

      console.log(data, status);

      if (status === 200) {
        setNewCode(response.data);
        // 인증 성공
        alert("인증이 완료되었습니다. 10분 안에 가입을 완료해주세요");
        setCodeValid(true);
        startTimer();
      } else if (status === -422) {
        // 인증 코드 비유효
        alert("인증 코드가 유효하지 않습니다. 다시 시도해주세요.");
      } else if (status === -404) {
        // 이메일 비유효
        alert("이메일이 유효하지 않습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 코드 인증한 시점으로부터 10분안에 가입하도록
  const startTimer = () => {
    const endTime = new Date().getTime() + 10 * 60 * 1000;

    setTimer(
      setInterval(() => {
        const remainingTime = endTime - new Date().getTime();

        if (remainingTime <= 0) {
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
  };

  const onClickBusiness = (value) => {
    setBusinessType(value);
    console.log("selected", value);
  };

  // TODO: 활성화
  const onPasswordConfirm = ({ password, passwordConfirm }) => {
    const { name, value } = passwordConfirm.target;
    if (name === "passwordConfirm") {
      if (password !== value) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("");
      }
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

  // TODO: 입력창에 커서놓고 엔터누르면 회사리스트 모달 켜지는 거 수정 필요

  return (
    <>
      {codeValid && <div></div>}
      {isModalOpen && (
        <Modal
          companyList={companyList}
          handleCompanyClick={handleCompanyClick}
          onClose={() => setModal(false)}
        />
      )}
      <Form>
        <Select
          placeholder="업종구분"
          className="inputtext"
          onChange={onClickBusiness}
          // value={}
        >
          {businessTypeList.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
        <Wrapper>
          <Input
            className="inputtext"
            name="companyName"
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            style={{
              width: "245px",
            }}
            placeholder="회사명"
          />
          <Button onClick={onClickCompany}>회사 검색</Button>
        </Wrapper>

        <Wrapper>
          <Input
            className="inputtext"
            name="email"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
            }}
            style={{
              width: "245px",
            }}
            placeholder="이메일"
          />
          <Button onClick={onClickEmail}>코드 전송</Button>
        </Wrapper>

        {codeSent && (
          <>
            <Wrapper>
              <Input
                className="inputtext"
                name="code"
                value={codeInput}
                onChange={(e) => {
                  setCodeInput(e.target.value);
                }}
                style={{
                  width: "245px",
                }}
                placeholder="인증 코드 입력"
              />
              <Button
                style={{ minWidth: "70px" }}
                onClick={onClickValidateCode}
              >
                인증하기
              </Button>
            </Wrapper>
          </>
        )}

        <Input
          className="inputtext"
          name="name"
          // value={form[Input]}
          onChange={onChange}
          placeholder="이름"
        />

        <Input
          className="inputtext"
          name="password"
          // value={form[Input]}
          onChange={onChange}
          placeholder="비밀번호"
          type="password"
        />

        <Input
          className="inputtext"
          name="passwordConfirm"
          // value={form[Input]}
          onChange={onChange}
          placeholder="비밀번호 확인"
          type="password"
        />

        {error && <div style={{ color: "red" }}>{error}</div>}

        <Input
          className="inputtext"
          name="number"
          // value={form[Input]}
          onChange={onPasswordConfirm}
          placeholder="전화번호 (숫자만 입력해주세요.)"
        />
      </Form>

      <SubmitButton onSubmit={handleSubmit}>Sign In</SubmitButton>
    </>
  );
};

export default SignUp;
