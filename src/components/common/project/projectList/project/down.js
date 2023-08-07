import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import useApi from "../../../../hooks/api/axiosInterceptor";
import { useState } from "react";
import parseRealParticipant from "../../../../hooks/api/realParticipant";

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
    padding: 5px;
    border-radius: 3px;
    background-color: #2eb82e;
    font-size: 13px;
    font-weight: bold;
    color: white;
    margin-right: 5px;
  }
`;

const ProjectControlContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  .btn {
    background-color: ${({ isRequested }) =>
      !isRequested ? "#1777ff" : "#64C65E"};
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    margin-left: 5px;
    cursor: pointer;
  }
  .btn_request {
    display: ${({ isAdmin }) => (isAdmin ? "none" : "block")};
  }
`;

const DownWrapper = ({
  targetCrew,
  projectId,
  ctrType: { value: ctrTypeValue },
  detailCtrType: { value: detailCtrTypeValue },
  company,
  participantList,
}) => {
  const [isRequested, setIsRequested] = useState(false);
  const pathname = useLocation().pathname.split("/")[2];

  const requestToJoin = async () => {
    try {
      await useApi.post(`/api/participant`, {
        projectId,
        targetCrewId: targetCrew?.id,
      });
      setIsRequested(true);
    } catch ({
      response: {
        data: { code },
      },
    }) {
      if (code === -407) alert("이미 참여 요청을 보낸 프로젝트입니다.");
      if (code === -425) alert("존재하지 않는 프로젝트입니다.");
    }
  };

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
      <ProjectControlContainer
        isRequested={isRequested}
        isAdmin={
          targetCrew?.role?.attr === "SERVICE_ADMIN" ||
          targetCrew?.role?.attr === "COMPANY_ADMIN"
        }
      >
        {pathname !== "project-participanting" &&
          pathname !== "project-pending" && (
            <button className="btn btn_request" onClick={requestToJoin}>
              {!isRequested ? "참여요청" : "참여요청 완료"}
            </button>
          )}
      </ProjectControlContainer>
    </DownContainer>
  );
};

export default DownWrapper;
