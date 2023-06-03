import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

const TabsContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.05);
`;

const Tab = styled.div`
  font-size: 20px;
  color: ${(props) => (props.isActive ? "black" : "gray")};
`;

const Tabs = ({ items }) => {
  const { pathname } = useLocation();
  return (
    <TabsContainer>
      {items.map(({ name, to }) => (
        <Tab isActive={pathname === to}>{name}</Tab>
      ))}
    </TabsContainer>
  );
};

export default Tabs;
