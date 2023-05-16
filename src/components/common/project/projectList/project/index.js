import styled from "@emotion/styled";
import ProjectWrapper from "./wrapper";

const Container = styled.div`
  height: 200px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  color: black;
  /* border: 0.5px solid gray; */
`;

const Thumbnail = styled.img`
  margin: 12px 0px 12px 12px;
  width: 340px;
  height: 180px;
  object-fit: fill;
  overflow: hidden;
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
