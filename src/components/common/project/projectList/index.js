import styled from "@emotion/styled";
import ProjectWrapper from "./project";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/api/axiosInterceptor";
import Header from "./header";
import Project from "./project";

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: scroll;
  /* height: 100vh; */
  margin-top: 30px;
  align-items: center;
  border: 1px solid;
  background-color: white;
`;

const ProjectListContainer = ({ projectList }) => {
  return (
    <ProjectContainer>
      <Header />
      {projectList?.map(
        ({ projectName, className, startDate, endDate, updateDate }) => (
          <Project
            key={className}
            ClassName={className}
            projectName={projectName}
            startDate={startDate}
            endDate={endDate}
            updateDate={updateDate}
          />
        )
      )}
    </ProjectContainer>
  );
};

export default ProjectListContainer;
