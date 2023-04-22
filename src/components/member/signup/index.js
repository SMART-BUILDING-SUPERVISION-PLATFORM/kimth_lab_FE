import styled from "@emotion/styled";
import { Input } from "antd";
import { useState } from "react";
import useApi from "../../hooks/api/axiosInterceptor";
import Modal from "./modal";

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

const SignUp = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyList, setCompanyList] = useState();
  const [isModalOpen, setModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [emailInput, setEmailInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [timer, setTimer] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    companyId: 0,
    password: "",
    phone: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  const onClickCompany = async (e) => {
    e.preventDefault();

    try {
      const { data, status } = await useApi.get("/api/company", {
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
    setSelectedCompanyId(companyId);
    setCompanyName(companyName);
    setModal(false);
  };

  const onClickEmail = async (e) => {
    e.preventDefault();

    try {
      const data = {
        email: emailInput,
      };
      const { status } = await useApi.post(
        "/api/crew/auth/email-duplication",
        data
      );

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
      const { status } = await useApi.post(
        "/api/crew/auth/validate-code",
        data
      );

      if (status === 200) {
        // 인증 성공
        alert("인증이 완료되었습니다. 10분 안에 가입을 완료해주세요");
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

  const catList = [
    { name: "password", placeholder: "비밀번호" },
    { name: "passwordConfirm", placeholder: "비밀번호 확인" },
  ];

  return (
    <>
      {/* {companyList && <Modal companyList={companyList} />} */}
      {isModalOpen && (
        <Modal
          companyList={companyList}
          handleCompanyClick={handleCompanyClick}
          onClose={() => setModal(false)}
        />
      )}
      <Form>
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
            <input
              className="inputtext"
              type="text"
              name="code"
              placeholder="인증 코드 입력"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
            />
            <button onClick={onClickValidateCode}>인증하기</button>
          </>
        )}

        <Input
          className="inputtext"
          name="name"
          value={form[Input]}
          onChange={onChange}
          placeholder="이름"
        />

        {catList.map((cat) => (
          <Input
            className="inputtext"
            name={cat.name}
            value={form[cat]}
            onChange={onChange}
            placeholder={cat.placeholder}
            type="password"
          />
        ))}

        <Input
          className="inputtext"
          name="number"
          value={form[Input]}
          onChange={onChange}
          placeholder="전화번호 (숫자만 입력해주세요.)"
        />

        {/* TODO: 업종구분 드롭다운 */}
      </Form>

      {/* TODO: 버튼 서식 */}
      <Button>Sign In</Button>
    </>
  );
};

export default SignUp;
