import styled from "@emotion/styled";
import UpWrapper from "./up";
import DownWrapper from "./down";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px;
  width: 100%;
  height: 180px;
`;

const ProjectWrapper = ({
  targetCrew,
  projectId,
  name,
  startDate,
  endDate,
  processRate,
  floorUrl,
  ctrType,
  detailCtrType,
  company,
  participantList,
  userInfo,
}) => {
  return (
    <Container>
      <UpWrapper
        projectId={projectId}
        name={name}
        startDate={startDate}
        endDate={endDate}
        processRate={processRate}
        floorUrl={floorUrl}
        userInfo={userInfo}
      />
      <DownWrapper
        targetCrew={targetCrew}
        projectId={projectId}
        ctrType={ctrType}
        detailCtrType={detailCtrType}
        company={company}
        participantList={participantList}
      />
    </Container>
  );
};

export default ProjectWrapper;
