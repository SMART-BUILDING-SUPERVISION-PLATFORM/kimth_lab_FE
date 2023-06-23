import styled from "@emotion/styled";
import useApi from "../../../../hooks/api/axiosInterceptor";
import { useNavigate } from "react-router-dom";

const NavContainer = styled.nav`
  width: ${(props) =>
    props.role === "COMPANY_ADMIN" || props.role === "COMPANY_ADMIN"
      ? "160px"
      : "100px"};
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: white;
  .navContainer {
    width: ${(props) =>
      props.role === "COMPANY_ADMIN" || props.role === "COMPANY_ADMIN"
        ? "33%"
        : "50%"};
    display: flex;
    justify-content: center;
    span {
      font-size: 12px;
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: #e6e6e6;
      }
    }
  }
`;

const item = {
  ADMIN: [
    {
      key: 1,
      label: "내 정보",
    },
    {
      key: 2,
      label: "관리자",
    },
    {
      key: 3,
      label: "로그아웃",
    },
  ],
  NORMAL: [
    {
      key: 1,
      label: "내 정보",
    },
    {
      key: 2,
      label: "로그아웃",
    },
  ],
};

const Nav = ({ role }) => {
  const nav = useNavigate();
  const itemList =
    role === "COMPANY_ADMIN" || role === "SERVICE_ADMIN"
      ? item.ADMIN
      : item.NORMAL;

  const logOut = async (label, role) => {
    if (label === "로그아웃") {
      (async () => {
        try {
          await useApi.get("/api/sign-out");
          nav("/auth/signin");
        } catch (error) {
          alert("다시 시도해주세요.");
        }
      })();
    } else if (label === "내 정보") {
      nav("/my");
    } else {
      if (role === "COMPANY_ADMIN") {
        nav("/admin/company/newbie");
      } else {
        nav("/admin/service/newbie");
      }
    }
  };

  return (
    <NavContainer role={role}>
      {itemList.map(({ key, label }) => (
        <div className="navContainer" key={key}>
          <span onClick={() => logOut(label, role)}>{label}</span>
        </div>
      ))}
    </NavContainer>
  );
};

export default Nav;
