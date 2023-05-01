import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import Header from "./header";
import SideBar from "./sidebar";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.005);
  overflow-y: auto;
`;

const Content = styled.div`
  height: auto;
  display: flex;
  flex-direction: row;
  /* align-items: row; */
`;

const GlobalContainer = () => {
  const [isSideBar, setIsSideBar] = useState(false);

  // TODO: 세션 아이디 있을 경우 project list로, 없으면 로그인 alert

  // TODO: outlet이 project일 때 setIsSideBar --> true

  return (
    <Container>
      <Header />
      <Content>
        {isSideBar && <SideBar />}
        {/* Outlet: 껍데기 */}
        <Outlet />
      </Content>
    </Container>
  );
};

export default GlobalContainer;
