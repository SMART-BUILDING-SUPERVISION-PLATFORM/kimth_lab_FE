import { useEffect, useState } from "react";
import useApi from "../../hooks/api/axiosInterceptor";
import Project from "../../common/project/projectList/project";
import { useOutletContext } from "react-router-dom";
import NoData from "../../common/exceptionComponent/noData";

const ProjectForParticipanting = () => {
  const { filter, userInfo } = useOutletContext();

  const [projectList, setProjectList] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await useApi.get("/api/project", {
          params: filter,
        });
        setProjectList(data);
      } catch (err) {}
    })();
  }, [filter]);

  return (
    <>
      {projectList?.length === 0 ? (
        <NoData />
      ) : (
        projectList?.map((project) => (
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

export default ProjectForParticipanting;
