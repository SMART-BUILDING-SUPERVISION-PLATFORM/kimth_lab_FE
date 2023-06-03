import styled from "@emotion/styled";
import Header from "./header";
import Project from "./project";
import { useState } from "react";

const ProjectContainer = styled.div`
  width: 100%;
  height: 70vh;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  margin: 10px 0px 10px 0px;
  background-color: white;
  .scrollable {
    height: auto;
    margin-bottom: 10px;
    overflow-y: scroll;
  }
`;

const ProjectListContainer = ({ projectList }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions);
  };

  return (
    <ProjectContainer>
      <Header
        numberOfProject={projectList?.length}
        onFilterClick={handleFilterChange}
      />
      <div className="scrollable">
        {projectList?.map((project) => (
          <Project
            key={project.id}
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
