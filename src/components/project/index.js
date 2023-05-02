import styled from "@emotion/styled";
import { Input, Button } from "antd";
import {
  PlusOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin-top: 30px;
  align-items: center;
  border: 1px solid;
  background-color: white;
`;

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 20px;
  .count {
    margin: 18px 0px 0px 10px;
    /* border: 2px solid black; */
    color: black;
    font-size: 15px;
  }
  .header-right {
    display: flex;
    flex-direction: row;
    width: auto;
    .addProject {
      width: 180px;
      background-color: #1777ff;
      color: #fff;
      margin-right: 10px;
    }
    .filter {
      margin-right: 10px;
      background-color: rgba(0, 0, 0, 0.15);
      color: black;
    }
  }
`;

const SearchWrapper = styled.div`
  border: none;
  width: 200px;
  height: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: row;
`;

const ProjectWrapper = styled.div`
  /* border: 2px solid black; */
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05);
  padding-left: 10px;
  display: block;
  width: 100%;
  margin-bottom: 10px;
  height: auto;
  color: black;
`;

// TODO: 프로젝트 리스트 서버에서 받아오기
const projectList = [
  {
    projectName: "A 프로젝트",
  },
  {
    projectName: "B  프로젝트",
  },
  {
    projectName: "C 프로젝트",
  },
  {
    projectName: "D 프로젝트",
  },
  {
    projectName: "E 프로젝트",
  },
  {
    projectName: "F 프로젝트",
  },
];

// TODO: project list에 나타낼 project 틀

const ProjectListWrapper = () => {
  return (
    // header
    <ProjectContainer>
      <HeaderWrapper>
        {/* TODO: project count */}
        <span className="count">?? Projects</span>
        <div className="header-right">
          {/* TODO: button modularize */}
          <Button
            className="addProject"
            type="primary"
            icon={<PlusOutlined style={{ marginRight: "10px" }} />}
            // onClick={ }
          >
            새 프로젝트 추가
          </Button>
          <Button
            className="filter"
            type="text"
            icon={<FilterOutlined />}
            // onClick={ }
          >
            필터
          </Button>
          <SearchWrapper>
            <Input
              placeholder="프로젝트 검색"
              style={{ border: "none" }}
            ></Input>
            <Button
              type="text"
              icon={<SearchOutlined style={{ color: "#aaa", fontSize: 16 }} />}
              // onClick={ }
            />
          </SearchWrapper>
        </div>
      </HeaderWrapper>
      {projectList.map(({ projectName }) => (
        <ProjectWrapper key={projectName}>{projectName}</ProjectWrapper>
      ))}
    </ProjectContainer>
  );
};

export default ProjectListWrapper;
