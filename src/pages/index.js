import styled from "@emotion/styled";
import OverviewBox from "../components/common/project/overview/index";
import ProjectListContainer from "../components/common/project/projectList";
import { useEffect, useState } from "react";
import useApi from "../components/hooks/api/axiosInterceptor";
import { useLocation } from "react-router-dom";

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 50px;
  padding: 0px 50px 40px 50px;
`;

const Main = () => {
  const location = useLocation();

  const [projectList, setProjectList] = useState([
    {
      id: 0,
      ctrType: {},
      detailCtrType: {},
      endDate: "",
      floorUrl: "",
      name: "",
      processRate: 0,
      startDate: "",
      thumbnailUrl: "",
      company: { id: 0, name: "", address: "" },
      participantList: [
        {
          id: 0,
          name: "",
          role: { attr: "", value: "" },
        },
      ],
    },
  ]);

  const [filter, setFilter] = useState({
    name: null,
    ctrType: null,
    detailCtrType: null,
    companyId: null,
    onlyMine: false,
    isPending: false,
  });

  useEffect(() => {
    (async () => {
      const { data } = await useApi.get("/api/project", {
        params: filter,
      });

      setProjectList(data);
    })();
  }, [filter, location]);

  return (
    <MainContainer>
      <OverviewBox />
      <ProjectListContainer
        projectList={projectList}
        filter={filter}
        setFilter={setFilter}
      />
    </MainContainer>
  );
};

export default Main;
