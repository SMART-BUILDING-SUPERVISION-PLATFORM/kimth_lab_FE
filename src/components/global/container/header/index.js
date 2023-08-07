import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import My from "./my";

const HeaderContainer = styled.header`
  transition: height 0.5s ease-in-out 0.4s;
  height: ${({ isProject }) => (isProject ? 0 : "50px")};
  display: flex;
  justify-content: space-between;
  background-color: #1e1e1e;
  padding: 0 50px;
  font-size: 24px;
  font-weight: bold;
`;

const Title = styled.h1`
  transition: color 0.3s ease-in-out 0.1s;
  color: ${({ isProject }) => (isProject ? "transparent" : "white")};
  display: block;

  line-height: 50px;
  cursor: pointer;
  margin-left: 10px;
`;

const Header = ({ userInfo, isProject }) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer isProject={isProject}>
      <Title
        isProject={isProject}
        onClick={() => {
          navigate("/home");
        }}
      >
        Smart Building Supervision Platform
      </Title>
      <My userInfo={userInfo} isProject={isProject} />
    </HeaderContainer>
  );
};

export default Header;
