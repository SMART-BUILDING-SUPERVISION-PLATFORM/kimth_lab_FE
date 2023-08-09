import styled from "@emotion/styled";
import useApi from "../../../../hooks/api/axiosInterceptor";
import { useNavigate } from "react-router-dom";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  transition: all 0.3s ease-in-out 0.1s;
  color: ${({ isProject }) => (isProject ? "transparent" : "white")};
  .navContainer {
    display: flex;
    justify-content: center;
    span {
      margin-left: 10px;
      font-size: 12px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const item = {
  ADMIN: [
    {
      key: 1,
      label: "MY",
    },
    {
      key: 2,
      label: "ADMIN",
    },
    {
      key: 3,
      label: "SIGN_OUT",
    },
  ],
  NORMAL: [
    {
      key: 1,
      label: "MY",
    },
    {
      key: 2,
      label: "SIGN_OUT",
    },
  ],
};

const Nav = ({ role, id, isProject }) => {
  const nav = useNavigate();

  const itemList =
    role === "COMPANY_ADMIN" || role === "SERVICE_ADMIN"
      ? item.ADMIN
      : item.NORMAL;

  const logOut = async (label) => {
    if (label === "SIGN_OUT") {
      (async () => {
        try {
          await useApi.get(`/api/crew/auth/sign-out`);
          nav("/auth/signin");
        } catch (error) {
          alert("다시 시도해주세요.");
        }
      })();
    } else if (label === "MY") nav(`/${id}/project-participanting`);
    else nav("/admin/pending");
  };

  return (
    <NavContainer role={role} isProject={isProject}>
      {itemList.map(({ key, label }) => (
        <div className="navContainer" key={key}>
          <span onClick={() => logOut(label)}>{label}</span>
        </div>
      ))}
    </NavContainer>
  );
};

export default Nav;
