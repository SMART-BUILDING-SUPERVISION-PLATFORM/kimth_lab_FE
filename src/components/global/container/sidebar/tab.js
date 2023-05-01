import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import home from "../../../../assets/img/project/home_icon.png";
import construction from "../../../../assets/img/project/construction_icon.png";
import structure from "../../../../assets/img/project/structure_icon.png";
import robot from "../../../../assets/img/project/robot_icon.png";
import docs from "../../../../assets/img/project/docs_icon.png";
import settings from "../../../../assets/img/project/settings_icon.png";

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80px;
  padding-top: 10px;
  width: 100%;
  :hover {
    cursor: pointer;
  }
`;

const TabIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
  /* background: url($icon); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Tab = ({ className, tabName, to }) => {
  const navigate = useNavigate();
  var path = "";

  switch (className) {
    case "home":
      path = home;
      break;
    case "construction":
      path = construction;
      break;
    case "structure":
      path = structure;
      break;
    case "robot":
      path = robot;
      break;
    case "docs":
      path = docs;
      break;
    case "settings":
      path = settings;
      break;
    default:
  }

  return (
    <TabContainer
      className={className}
      onClick={() => {
        navigate(to);
      }}
    >
      <TabIcon
        style={{
          backgroundImage: `url(${path})`,
        }}
      />
      <span>{tabName}</span>
    </TabContainer>
  );
};

export default Tab;
