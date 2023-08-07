import styled from "@emotion/styled";
import ProjectWrapper from "./wrapper";
import { CloseSquareOutlined } from "@ant-design/icons";

const Container = styled.div`
  height: 200px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  color: black;
`;

const ThumbnailContainer = styled.div`
  margin: 12px 0px 12px 12px;
  border-radius: 5px;
  width: 340px;
  height: 180px;
  object-fit: fill;
  overflow: hidden;
  transition: all ease-in 0.2s;
  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  }
`;

const ThumbnailWrapper = ({ thumbnailUrl, projectId }) => {
  return (
    <ThumbnailContainer
      onClick={() => (window.location.href = `/${projectId}/view`)}
    >
      {thumbnailUrl === "" ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CloseSquareOutlined
            style={{
              opacity: 0.5,
            }}
          />
        </div>
      ) : (
        <img
          src={thumbnailUrl}
          alt="Project Thumbnail"
          style={{ width: "100%", height: "100%", objectFit: "fill" }}
        />
      )}
    </ThumbnailContainer>
  );
};

const Project = ({
  targetCrew,
  projectId,
  name,
  startDate,
  endDate,
  processRate,
  thumbnailUrl,
  floorUrl,
  ctrType,
  detailCtrType,
  company,
  participantList,
  userInfo,
}) => {
  return (
    <Container>
      <ThumbnailWrapper thumbnailUrl={thumbnailUrl} projectId={projectId} />
      <ProjectWrapper
        targetCrew={targetCrew}
        projectId={projectId}
        name={name}
        startDate={startDate}
        endDate={endDate}
        processRate={processRate}
        floorUrl={floorUrl}
        ctrType={ctrType}
        detailCtrType={detailCtrType}
        company={company}
        participantList={participantList}
        userInfo={userInfo}
      />
    </Container>
  );
};

export default Project;
