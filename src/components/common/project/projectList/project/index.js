import styled from "@emotion/styled";
import ProjectWrapper from "./wrapper";

const Container = styled.div`
  width: 100%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  /* padding-left: 10px; */
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  color: black;
  /* border: 0.5px solid gray; */
`;

const Thumbnail = styled.img`
  margin: 12px 0px 12px 12px;
  display: flex;
  width: 320px;
  height: 180px;
  border: 1px solid black;
`;

const Project = ({
  name,
  startDate,
  endDate,
  processRate,
  thumbnailUrl,
  floorUrl,
}) => {
  // const { name, startDate, endDate, processRate, thumbnailUrl, floorUrl } =
  //   project;

  return (
    <Container>
      <Thumbnail src={thumbnailUrl} alt="Project Thumbnail"></Thumbnail>
      <ProjectWrapper
        name={name}
        startDate={startDate}
        endDate={endDate}
        processRate={processRate}
        floorUrl={floorUrl}
      />
    </Container>
  );
};

export default Project;
