import styled from "@emotion/styled";
import Header from "./header";
import Project from "./project";


const ProjectListContainer = ({ projectList }) => {
  return (
    <ProjectContainer>
      <Header numberOfProject={projectList?.length} />
      <div className="scrollable">
        {projectList?.map((project) => (
          <Project
            key={project.className}
            ClassName={project.companyId}
            name={project.name}
            startDate={project.startDate}
            endDate={project.endDate}
            processRate={project.processRate}
            thumbnailUrl={project.thumbnailUrl}
            floorUrl={project.floorUrl}
          />
        ))}
      </div>
    </ProjectContainer>
  );
};

export default ProjectListContainer;
