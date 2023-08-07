import { useEffect, useState } from "react";
import useApi from "../../hooks/api/axiosInterceptor";
import Project from "../../common/project/projectList/project";
import { useOutletContext } from "react-router-dom";
import NoData from "../../common/exceptionComponent/noData";

const ProjectForPending = () => {
  const { filter, userInfo } = useOutletContext();
  const [projectList, setProjectList] = useState([
    {
      id: 0,
      ctrType: {},
      detailCtrType: {},
      endDate: "",
      floorUrl: "",
      name: "",
      processRate: "",
      startDate: "",
      thumbnailUrl: "",
    },
  ]);

  const filterProject = (projectList) => {
    const filteredProject = projectList.filter(({ id }) => id !== 0);
    return filteredProject;
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await useApi.get("/api/project", {
          params: filter,
        });
        const filteredData = filterProject(data);
        setProjectList(filteredData);
      } catch (err) {
        alert("프로젝트를 불러오는데 실패했습니다.");
      }
    })();
  }, [filter]);

  return (
    <>
      {projectList?.length === 0 ? (
        <NoData />
      ) : (
        projectList.map((project) => (
          <Project
            targetCrew={userInfo}
            projectId={project?.id}
            name={project?.name}
            startDate={project?.startDate}
            endDate={project?.endDate}
            processRate={project?.processRate}
            floorUrl={project?.floorUrl}
            ctrType={project?.ctrType}
            detailCtrType={project?.detailCtrType}
            thumbnailUrl={project?.thumbnailUrl}
            participantList={project?.participantList}
            company={project?.company}
          />
        ))
      )}
    </>
  );
};

export default ProjectForPending;
