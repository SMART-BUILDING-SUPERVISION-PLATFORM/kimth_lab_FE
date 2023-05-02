import styled from "@emotion/styled";
import OverviewBox from "../components/common/project/overview/index";
import ProjectListContainer from "../components/common/project/projectList";
import { useEffect, useState } from "react";
import useApi from "../components/hooks/api/axiosInterceptor";

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: whitesmoke;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 50px;
  padding: 0px 50px 40px 50px;
`;

const Main = () => {
  // TODO: admin 종류에 따라(id에 따라) 프로젝트 리스트 다르게 하는거
  const [projectList, setProjectList] = useState();
  const [params, setParams] = useState({
    name: null,
    ctrClass: null,
    detailCtrClass: null,
    companyId: null,
    onlyMine: false,
  });
  useEffect(() => {
    (async () => {
      const { data } = await useApi.get("/api/project", {
        params,
      });
      setProjectList(data);
    })();
  }, [params]);
  return (
    <MainContainer>
      <OverviewBox />
      <ProjectListContainer projectList={projectList} />
    </MainContainer>
  );
};

export default Main;

// Main: 프로젝트 리스트 (overview)
// GlobalContainer: header, sidebar, sessionID에 따라 재로그인 alert
// ProjectListForm: Main 페이지의 한 프로젝트 프레임
// ProjectHome: [Sidebar - HOME]
// ProjectConstruction: [Sidebar - 시공감리]
// ProjectStructure: [Sidebar - 구조감리]
// ProjectRobot: [Sidebar - 로봇]
// ProjectDocs: [Sidebar - 도면/문서]
// ProjectSettings: [Sidebar - 설정]
