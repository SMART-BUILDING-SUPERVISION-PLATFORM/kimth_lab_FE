import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import useApi from "../../../../hooks/api/axiosInterceptor";
import { useState } from "react";
import parseRealParticipant from "../../../../hooks/api/realParticipant";
import SetUp from "./setup";

const DownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
`;

const ProjectTypeContainer = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.8;
  .txt {
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.4);
    padding: 5px;
    border-radius: 3px;
    font-size: 13px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.6);
    margin-right: 5px;
    transition: all 0.2s linear;
    &:hover {
      color: #1777ff;
      border: 1px solid #1777ff;
    }
  }
`;

const ProjectControlContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const DownWrapper = ({
  projectId,
  ctrType: { value: ctrTypeValue },
  detailCtrType: { value: detailCtrTypeValue },
  company,
  participantList,
  userInfo,
}) => {
  const { pathname } = useLocation();
  return (
    <DownContainer>
      <ProjectTypeContainer>
        <span className="txt">{company?.name}</span>
        <span className="txt">{ctrTypeValue}</span>
        <span className="txt">{detailCtrTypeValue}</span>
        <span className="txt">
          {parseRealParticipant(participantList)}명 참여
        </span>
      </ProjectTypeContainer>
      <ProjectControlContainer>
        <SetUp
          projectId={projectId}
          userInfo={userInfo}
          isHome={pathname === "/home"}
          isSa={userInfo?.role?.attr === "SERVICE_ADMIN"}
        />
      </ProjectControlContainer>
    </DownContainer>
  );
};

export default DownWrapper;
