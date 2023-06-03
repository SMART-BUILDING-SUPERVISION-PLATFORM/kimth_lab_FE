import styled from "@emotion/styled";
import { useEffect } from "react";
import useApi from "../../../../hooks/api/axiosInterceptor";
import Status from "./status";
// import ProgressBar from "react-bootstrap/ProgressBar";

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
  // dummy data 나중에 서버에서 받아오기
  const statusList = [
    {
      id: 1,
      value: [
        { label: "KPI", value: "85" },
        {
          label: "Inspection Passing Rate",
          value: "85.0%",
          //   [
          //   { label: "rate", value: "85.0%" },
          //   { label: "count", value: "1,700" },
          //   { label: "pass", value: "2,000" },
          // ],
        },
        {
          label: "Robot Progress",
          value: "50%",
          //   [
          //   { label: "progress", value: "50%" },
          //   { label: "count", value: "4" },
          // ],
        },
        {
          label: "Open/Close Inspection",
          value: "14/13",
          //   [
          //   { label: "Open", value: "14" },
          //   { label: "Close", value: "13" },
          // ],
        },
      ],
    },
    {
      id: 2,
      value: [
        { label: "KPI", value: "20" },
        {
          label: "Inspection Passing Rate",
          value: "20.0%",
          //   [
          //   { label: "rate", value: "65.7%" },
          //   { label: "count", value: "657" },
          //   { label: "pass", value: "1,000" },
          // ],
        },
        {
          label: "Robot Progress",
          value: "30%",
          //   [
          //   { label: "progress", value: "30%" },
          //   { label: "count", value: "2" },
          // ],
        },
        {
          label: "Open/Close Inspection",
          value: "24/30",
          //   [
          //   { label: "Open", value: "24" },
          //   { label: "Close", value: "30" },
          // ],
        },
      ],
    },
  ];

  return (
    <Container>
      {/*  */}
      <div className="upper">
        <ProjectInfo>
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
