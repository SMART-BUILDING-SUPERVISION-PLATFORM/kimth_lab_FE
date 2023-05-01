import styled from "@emotion/styled";
import OverviewBox from "../components/project/overview";
import ProjectFrame from "../components/project";
import ProjectListWrapper from "../components/project";

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 50px;
  padding-left: 50px;
  padding-right: 50px;
`;

const OverviewWrapper = styled.div`
  width: 100%;
  height: auto;
  span {
    margin-top: 10px;
    color: black;
    height: 30px;
    font-size: 20px;
    font-weight: bold;
  }
  .boxContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const overviewList = [
  {
    className: "caution",
    iconName: "caution",
    boxLabel: "Caution Projects",
    countColor: "red",
  },
  {
    className: "littlecaution",
    iconName: "caution",
    boxLabel: "Little Caution Projects",
    countColor: "#ffb31a",
  },
  {
    className: "normal",
    iconName: "normal",
    boxLabel: "Normal Projects",
    countColor: "#0052cc",
  },
  {
    className: "healthy",
    iconName: "healthy",
    boxLabel: "Healthy Projects",
    countColor: "#2eb82e",
  },
];

// TODO: 프로젝트 리스트 서버에서 받아오기
const projectList = [
  {
    name: "A 프로젝트",
  },
  {
    name: "B  프로젝트",
  },
  {
    name: "C 프로젝트",
  },
  {
    name: "D 프로젝트",
  },
  {
    name: "E 프로젝트",
  },
  {
    name: "F 프로젝트",
  },
];

// Main: 프로젝트 리스트 (overview)
// GlobalContainer: header, sidebar, sessionID에 따라 재로그인 alert
// ProjectListForm: Main 페이지의 한 프로젝트 프레임
// ProjectHome: [Sidebar - HOME]
// ProjectConstruction: [Sidebar - 시공감리]
// ProjectStructure: [Sidebar - 구조감리]
// ProjectRobot: [Sidebar - 로봇]
// ProjectDocs: [Sidebar - 도면/문서]
// ProjectSettings: [Sidebar - 설정]

const Main = () => {
  // TODO: admin 종류에 따라(id에 따라) 프로젝트 리스트 다르게 하는거
  return (
    <MainContainer>
      <OverviewWrapper>
        <span>Overview</span>
        <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
        <div className="boxContainer">
          {overviewList.map(({ className, iconName, boxLabel, countColor }) => (
            <OverviewBox
              key={className}
              className={className}
              iconName={iconName}
              boxLabel={boxLabel}
              countColor={countColor}
            />
          ))}
        </div>
      </OverviewWrapper>
      {/* project list map */}
      <ProjectListWrapper />
    </MainContainer>
  );
};

export default Main;
