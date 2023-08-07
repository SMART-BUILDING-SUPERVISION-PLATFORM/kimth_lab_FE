import styled from "@emotion/styled";
import Header from "./header/headerForFilter";
import Project from "./project";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/api/axiosInterceptor";
import NoData from "../../exceptionComponent/noData";

const ProjectContainer = styled.div`
  width: 100%;
  height: calc(100vh - 112px);
  display: flex;
  flex-direction: column;
  margin: 10px 0px 10px 0px;
  background-color: white;
  .scrollable {
    height: auto;
    margin-bottom: 10px;
    overflow-y: scroll;
    height: 100%;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

const ProjectListContainer = ({ projectList, setFilter }) => {
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
        if (code === -423) {
          alert("존재하지 않는 회원입니다.");
        }
      }
    })();
  }, []);

  return (
    <ProjectContainer>
      <Header setFilter={setFilter} />
      <div className="scrollable">
        {projectList?.length === 0 ? (
          <NoData color="black" reload={true} />
        ) : (
          projectList?.map((project) => (
            <Project
              targetCrew={userInfo}
              key={project?.id}
              projectId={project?.id}
              ClassName={project?.companyId}
              name={project?.name}
              startDate={project?.startDate}
              endDate={project?.endDate}
              processRate={project?.processRate}
              thumbnailUrl={project?.thumbnailUrl}
              floorUrl={project?.floorUrl}
              ctrType={project?.ctrType}
              detailCtrType={project?.detailCtrType}
              participantList={project?.participantList}
              company={project?.company}
              userInfo={userInfo}
            />
          ))
        )}
      </div>
    </ProjectContainer>
  );
};

export default ProjectListContainer;
