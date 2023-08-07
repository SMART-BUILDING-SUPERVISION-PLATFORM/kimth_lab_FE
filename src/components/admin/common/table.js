import styled from "@emotion/styled";
import useApi from "../../hooks/api/axiosInterceptor";
import { useLocation, useNavigate } from "react-router-dom";

const ItemContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
`;
const ElementContainer = styled.div`
  width: 100%;
  display: flex;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  justify-content: space-between;
  align-items: center;
`;

const Element = styled.div`
  min-width: 16.66%;
  height: 100%;
  display: flex;
  justify-content: center;
  &:first-of-type {
    justify-content: flex-start;
    padding-left: 10px;
  }
  align-items: center;
  .txt {
    font-weight: ${({ isName }) => (!isName ? "bold" : "normal")};
    cursor: ${({ isName }) => (!isName ? "pointer" : "default")};
    text-decoration: ${({ isName }) => (!isName ? "underline" : "none")};
    font-size: 15px;
    color: black;
    text-align: end;
  }
`;

const ToggleButton = styled.button`
  width: 70px;
  height: 35px;
  color: ${({ isIndex }) => (isIndex ? "black" : "white")};
  background-color: ${({ isIndex }) => (isIndex ? "transparent" : "#1777ff")};
  opacity: ${({ userRole, isSameCompany }) =>
    userRole === "COMPANY_ADMIN" && isSameCompany
      ? "1"
      : userRole === "COMPANY_ADMIN" && !isSameCompany
      ? "0.5"
      : "1"};
  cursor: ${({ isIndex }) => (isIndex ? "" : "pointer")};
  border: none;
  border-radius: 5px;
`;

const DeleteButton = styled.button`
  width: 70px;
  height: 35px;
  color: ${({ isIndex }) => (isIndex ? "black" : "white")};
  background-color: ${({ isIndex }) => (isIndex ? "transparent" : "#FF0000")};
  opacity: ${({ userRole, isSameCompany }) =>
    userRole === "COMPANY_ADMIN" && isSameCompany
      ? "1"
      : userRole === "COMPANY_ADMIN" && !isSameCompany
      ? "0.5"
      : "1"};
  cursor: ${({ isIndex }) => (isIndex ? "" : "pointer")};
  border: none;
  border-radius: 5px;
`;

const Item = ({ crew, currentCompanyId, userRole }) => {
  const navigate = useNavigate();
  const path = useLocation().pathname.split("/")[2];
  const serializedCrew = Object.values(crew).slice(1, 6);

  const allowCrew = async () => {
    try {
      await useApi.put(
        `/api/crew/admin-${userRole === "COMPANY_ADMIN" ? "ca" : "sa"}/${
          crew.id
        }`
      );
      alert("처리되었습니다.");
      window.location.reload();
    } catch (err) {
      const { code } = err.response.data;
      if (code === -412) alert("접근 권한이 없습니다.");
      if (code === -423) alert("존재하지 않는 회원입니다.");
    }
  };

  const deleteCrew = async () => {
    try {
      await useApi.delete(
        `/api/crew/admin-${userRole === "COMPANY_ADMIN" ? "ca" : "sa"}/${
          crew.id
        }`
      );
      alert("처리되었습니다.");
      window.location.reload();
    } catch (err) {
      const { code } = err.response.data;
      if (code === -412) alert("접근 권한이 없습니다.");
      if (code === -423) alert("존재하지 않는 회원입니다.");
    }
  };

  return (
    <ElementContainer>
      {serializedCrew.map((values, i) => (
        <Element key={values} isName={i}>
          <span
            className="txt"
            onClick={() => {
              if (crew.id !== 0)
                i === 0 && navigate(`/${crew.id}/project-participanting`);
            }}
          >
            {values}
          </span>
        </Element>
      ))}
      <ToggleButton
        userRole={userRole}
        isSameCompany={crew.companyId === currentCompanyId}
        onClick={crew.id === 0 ? null : allowCrew}
        isIndex={crew.id === 0}
      >
        {path === "pending" ? "승인" : "정지"}
      </ToggleButton>
      {path === "manage" && (
        <DeleteButton
          isIndex={crew.id === 0}
          userRole={userRole}
          isSameCompany={crew.companyId === currentCompanyId}
          onClick={crew.id === 0 ? null : deleteCrew}
        >
          삭제
        </DeleteButton>
      )}
    </ElementContainer>
  );
};

const Table = ({ crewData, currentCompanyId, userRole }) => {
  return (
    <>
      {crewData.map((crew) => (
        <ItemContainer key={crew.email}>
          <Item
            crew={crew}
            currentCompanyId={currentCompanyId}
            userRole={userRole}
          />
        </ItemContainer>
      ))}
    </>
  );
};

export default Table;
