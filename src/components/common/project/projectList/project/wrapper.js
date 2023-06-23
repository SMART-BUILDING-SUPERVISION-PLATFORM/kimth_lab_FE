import styled from "@emotion/styled";
import Status from "./status";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px;
  width: 100%;
  height: 180px;
  border: 1px solid black;
  .upper {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid black;
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 40%;
  height: 140px;
  align-items: flex-start;
  padding: 12px;
  .name {
    font-weight: bold;
    font-size: 24px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  margin: 1px;
  flex-direction: column;
  .date {
    font-size: 15px;
    display: flex;
    justify-content: space-between;
  }
  .rate {
    height: 15px;
    background-color: blue;
  }
`;

const ProjectStatus = styled.div`
  width: 60%;
  height: 140px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  .statusContainer {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ProjectManage = styled.div``;

const ProjectWrapper = ({
  name,
  startDate,
  endDate,
  processRate,
  floorUrl,
}) => {
  return (
    <Container>
      {/*  */}
      <div className="upper">
        <ProjectInfo
        // TODO: project detail page로 navigate
        // onClick={() => { }}
        >
          <span className="name">{name}</span>
          <div style={{ height: "50px" }} />
          <ProgressBar>
            <div className="date">
              <span>{startDate}</span>
              <span>{endDate}</span>
            </div>
            <div style={{ border: "1px solid black" }}>
              <div className="rate" style={{ width: `${processRate}%` }} />
            </div>
          </ProgressBar>
        </ProjectInfo>
        <ProjectStatus>
          {/* {statusList?.map(({ id, value}) => (
            <Status key={id} label={value.label} value={value} />
          ))} */}
          <Status label="KPI" value="85" />
          <Status label="Inspection Passing Rate" value="85.0%" />
          <Status label="Robot Progress" value="50%" />
          <Status label="Open/Close Inspection" value="14/13" />
        </ProjectStatus>
      </div>
      {/*  */}

      <ProjectManage></ProjectManage>
      {/*  */}
    </Container>
  );
};

export default ProjectWrapper;
