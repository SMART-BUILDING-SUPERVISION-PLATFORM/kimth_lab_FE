import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px;
  width: 100%;
  border: 1px solid black;
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  .name {
    font-weight: bold;
    font-size: 24px;
  }
`;

const ProjectManage = styled.div``;

const ProjectWrapper = ({ dummyProjectList }) => {
  return (
    <Container>
      <ProjectInfo>
        {/* <span className="name">{projectList.name}</span> */}
        {dummyProjectList.map((project) => (
          <div key={project.id}>
            <h2>{project.name}</h2>
            <p>Start Date: {project.startDate}</p>
            <p>End Date: {project.endDate}</p>
            <p>Process Rate: {project.processRate}%</p>
            {/* <img src={project.thumbnailUrl} alt="Project Thumbnail" /> */}
            {/* <a href={project.floorUrl}>Floor Plan</a> */}
          </div>
        ))}
      </ProjectInfo>
      <hr />
      <ProjectManage></ProjectManage>
    </Container>
  );
};

export default ProjectWrapper;
