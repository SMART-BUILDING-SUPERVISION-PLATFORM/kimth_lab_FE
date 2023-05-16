import styled from "@emotion/styled";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.005);
  overflow-y: hidden;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
`;

const GlobalContainer = () => {
  const [isSideBar, setIsSideBar] = useState(false);
  const location = useLocation();

  // TODO: 세션 아이디 있을 경우 project list로, 없으면 로그인 alert

  // useEffect(() => {
  //   if (location.pathname === "/project") {
  //     setIsSideBar(false);
  //   } else if (location.pathname.startsWith("/project/")) {
  //     setIsSideBar(true);
  //   }
  // }, [location]);

  return (
    <Container>
      <Header />
      <Content>
        {isSideBar && <SideBar />}
        <Outlet />
      </Content>
    </Container>
  );
};

export default GlobalContainer;
