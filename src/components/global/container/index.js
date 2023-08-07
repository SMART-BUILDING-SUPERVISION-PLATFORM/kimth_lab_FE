import styled from "@emotion/styled";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import { useEffect, useState } from "react";
import useApi from "../../hooks/api/axiosInterceptor";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
`;

const Content = styled.div`
  width: 100%;
  transition: all 0.8s ease-in-out;
  height: 100%;
`;

const GlobalContainer = () => {
  const { pathname } = useLocation();

  const [isProject, setIsProject] = useState(false);

  useEffect(() => {
    const path = pathname.split("/")[2];
    if (path === "view" || path === "inspect" || path === "process")
      setIsProject(true);
    else setIsProject(false);
  }, [pathname]);

  const [userInfo, setUserInfo] = useState({
    company: {
      address: null,
      id: null,
      name: null,
    },
    email: null,
    id: null,
    name: null,
    pending: false,
    phone: null,
    role: { attr: null, value: null },
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await useApi.get("/api/crew");
        setUserInfo(data);
      } catch (err) {
        const { code } = err.response.data;
        if (code === -423) alert("존재하지 않는 회원입니다.");
      }
    })();
  }, [pathname]);

  return (
    <Container>
      <Header userInfo={userInfo} isProject={isProject} />
      <Content isProject={isProject}>
        <Outlet context={{ userInfo }} />
      </Content>
    </Container>
  );
};

export default GlobalContainer;
