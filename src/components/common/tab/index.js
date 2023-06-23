import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";

const TabsContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;

const Tab = styled.div`
  font-size: 15px;
  margin-right: 7px;
  cursor: pointer;
  color: ${(props) => (props.isActive ? "black" : "gray")};
  &:hover {
    color: black;
  }
`;

const Tabs = ({ items }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <TabsContainer>
      {items.map(({ name, to }) => (
        <Tab key={to} isActive={pathname === to} onClick={() => navigate(to)}>
          {name}
        </Tab>
      ))}
    </TabsContainer>
  );
};

export default Tabs;
