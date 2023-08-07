import styled from "@emotion/styled";
import SideWrapper from "./side";
import { Outlet } from "react-router-dom";

const ProjectContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const OutletContainer = styled.div`
  width: calc(100% - 330px);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ProjectWrapper = ({ projectId, userInfo }) => {
  return (
    <ProjectContainer>
      <SideWrapper projectId={projectId} userInfo={userInfo} />
      <OutletContainer>
        <Outlet context={{ projectId }} />
      </OutletContainer>
    </ProjectContainer>
  );
};

export default ProjectWrapper;
