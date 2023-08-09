import styled from "@emotion/styled";
import Status from "./status";
import { useLocation } from "react-router-dom";

const UpContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectInfo = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 0;
  .name {
    font-size: 20px;
    margin-bottom: 60px;
    cursor: pointer;
  }
  .progress {
    width: 100%;
    height: 10px;
    margin: 1px;
    .date {
      font-size: 15px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      color: rgba(0, 0, 0, 0.7);
    }
    .rate {
      height: 15px;
      background-color: #1777ff;
      border-radius: 3px;
    }
  }
`;

const ProjectStatus = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-right: 9px;
`;

const UpWrapper = ({
  projectId,
  name,
  startDate,
  endDate,
  floorUrl,
  processRate,
  userInfo,
}) => {
  const { pathname } = useLocation();

  const properties = {
    processRate: {
      attr: "공정률",
      value: processRate,
      color: "black",
    },
    alert: {
      new: {
        attr: "new",
        value: null,
        color: "#2eb82e",
      },
      caution: {
        attr: "caution",
        value: null,
        color: "red",
      },
      support: {
        attr: "support",
        value: null,
        color: "#0052cc",
      },
    },
  };

  const caculatePercentage = (startDate, endDate) => {
    const currentDate = new Date();
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const totalDate = (endDateObj - startDateObj) / 1000 / 60 / 60 / 24;
    const currentDateFromStart =
      (currentDate - startDateObj) / 1000 / 60 / 60 / 24;

    return (currentDateFromStart / totalDate) * 100;
  };

  return (
    <UpContainer>
      <ProjectInfo workRate={caculatePercentage(startDate, endDate)}>
        <span
          className="name"
          onClick={() => (window.location.href = `/${projectId}/view`)}
        >
          {name}
        </span>
        <div className="progress">
          <div className="date">
            <span>{startDate}</span>
            <span>{endDate}</span>
          </div>
          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.2)",
              marginTop: "3px",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <div
              className="rate"
              style={{ width: `${caculatePercentage(startDate, endDate)}%` }}
            />
          </div>
        </div>
      </ProjectInfo>
      <ProjectStatus>
        <Status
          projectId={projectId ?? null}
          label={properties.processRate.attr}
          value={properties.processRate.value}
          color={properties.processRate.color}
          userRole={userInfo?.role?.attr}
          pathname={pathname}
        />
        <Status
          projectId={projectId ?? null}
          label={properties.alert.new.attr}
          value={properties.alert.new.value}
          color={properties.alert.new.color}
          userRole={userInfo?.role?.attr}
          pathname={pathname}
        />
        <Status
          projectId={projectId ?? null}
          label={properties.alert.caution.attr}
          value={properties.alert.caution.value}
          color={properties.alert.caution.color}
          userRole={userInfo?.role?.attr}
          pathname={pathname}
        />
        <Status
          projectId={projectId ?? null}
          label={properties.alert.support.attr}
          value={properties.alert.support.value}
          color={properties.alert.support.color}
          userRole={userInfo?.role?.attr}
          pathname={pathname}
        />
      </ProjectStatus>
    </UpContainer>
  );
};

export default UpWrapper;
