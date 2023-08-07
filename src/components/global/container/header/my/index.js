import styled from "@emotion/styled";
import Nav from "./nav";

const MyContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out 0.1s;
  color: ${({ isProject }) => (isProject ? "transparent" : "white")};
  font-size: 12px;
  .companyContainer {
    min-width: 50px;
    display: flex;
    justify-content: center;
  }
  .userContainer {
    min-width: 50px;
    display: flex;
    justify-content: center;
  }
`;

const My = ({
  userInfo: {
    id,
    company: { name: companyName },
    name,
    role: { attr: role },
  },
  isProject,
}) => {
  return (
    <MyContainer isProject={isProject}>
      <div className="companyContainer">
        <span>{companyName}</span>
      </div>
      <div className="userContainer">
        <span>{name}님</span>
      </div>
      <Nav role={role} id={id} isProject={isProject} />
    </MyContainer>
  );
};

export default My;
