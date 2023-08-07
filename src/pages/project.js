import styled from "@emotion/styled";
import { useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import SideWrapper from "../components/project/side";

const ProjectContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const OutletContainer = styled.div`
  width: ${({ isLoading }) => (isLoading ? 0 : "calc(100% - 330px)")};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Project = () => {
  const { userInfo } = useOutletContext();

  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ProjectContainer>
      <SideWrapper
        projectId={projectId}
        userInfo={userInfo}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <OutletContainer isLoading={isLoading}>
        <Outlet context={{ projectId, isLoading }} />
      </OutletContainer>
    </ProjectContainer>
  );
};

export default Project;
