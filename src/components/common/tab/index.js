import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";

const TabsContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
`;

const Tab = styled.div`
  font-size: 15px;
  margin-right: 7px;
  padding: 5px;
  border-radius: 5px;
  background-color: ${({ isActive }) => (isActive ? "black" : "transparent")};
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? "white" : "gray")};
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const Tabs = ({ items }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <TabsContainer>
      {items.map(({ name, to }) => (
        <Tab key={to} isActive={pathname === to} onClick={() => navigate(to)}>
          <span>{name}</span>
        </Tab>
      ))}
    </TabsContainer>
  );
};

export default Tabs;
