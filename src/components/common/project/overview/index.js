import styled from "@emotion/styled";
import caution from "../../../../assets/img/project/overview/caution_icon.png";
import normal from "../../../../assets/img/project/overview/normal_icon.png";
import healthy from "../../../../assets/img/project/overview/healthy_icon.png";
import Alert from "./alert";

const OverviewContainer = styled.div`
  width: 100%;
  height: 180px;
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
    iconName: caution,
    boxLabel: "Caution Projects",
    countColor: "red",
  },
  {
    className: "littlecaution",
    iconName: caution,
    boxLabel: "Little Caution Projects",
    countColor: "#ffb31a",
  },
  {
    className: "normal",
    iconName: normal,
    boxLabel: "Normal Projects",
    countColor: "#0052cc",
  },
  {
    className: "healthy",
    iconName: healthy,
    boxLabel: "Healthy Projects",
    countColor: "#2eb82e",
  },
];

const OverviewBox = () => {
  return (
    <OverviewContainer>
      <span>Overview</span>
      <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
      <div className="boxContainer">
        {overviewList.map(({ className, iconName, boxLabel, countColor }) => (
          <Alert
            key={boxLabel}
            className={className}
            iconName={iconName}
            boxLabel={boxLabel}
            countColor={countColor}
          />
        ))}
      </div>
    </OverviewContainer>
  );
};

export default OverviewBox;
