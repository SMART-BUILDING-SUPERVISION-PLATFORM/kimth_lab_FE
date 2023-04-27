import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
`;

const GlobalContainer = () => {
  return (
    <Container>
      {/* add Global Header */}
      {/* add Global Side */}
      <Outlet />
    </Container>
  );
};

export default GlobalContainer;
