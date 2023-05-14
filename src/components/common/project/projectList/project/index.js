import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05);
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  color: black;
`;

const Thumbnail = styled.image`
  display: flex;
  width: 50px;
  height: 70px;
`;

const ProjectInfo = styled.div``;

const Project = ({ projectName, startDate, endDate, updateDate }) => {
  return (
    <Container>
      {/* TODO: style update */}
      <Thumbnail></Thumbnail>
      <ProjectInfo />
      {/* <span>{projectName}</span>
      <span>{startDate}</span>
      <span>{endDate}</span>
      <span>{updateDate}</span> */}
    </Container>
  );
};

export default Project;
