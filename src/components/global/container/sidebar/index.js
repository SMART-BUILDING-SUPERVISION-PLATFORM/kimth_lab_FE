import styled from "@emotion/styled";
import Tab from "./tab";

const SideBarContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  color: black;
  height: 100vh;
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  font-size: 12px;
  /* padding: 20px 0; */
`;

const TabList = [
  {
    className: "home",
    tabName: "HOME",
    iconName: "home_icon",
    // to:
  },
  {
    className: "construction",
    tabName: "시공감리",
    iconName: "construction_icon",
  },
  {
    className: "structure",
    tabName: "구조감리",
    iconName: "structure_icon",
  },
  {
    className: "robot",
    tabName: "로봇",
    iconName: "robot_icon",
  },
  {
    className: "docs",
    tabName: "도면/문서",
    iconName: "docs_icon",
  },
  {
    className: "settings",
    tabName: "설정",
    iconName: "settings_icon",
  },
];

const SideBar = () => {
  return (
    <SideBarContainer>
      {TabList.map(({ className, tabName, iconName }) => (
        <Tab
          key={className}
          className={className}
          tabName={tabName}
          iconName={iconName}
        />
      ))}
    </SideBarContainer>
  );
};

export default SideBar;
