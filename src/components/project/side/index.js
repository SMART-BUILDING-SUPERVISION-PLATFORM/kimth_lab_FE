import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import useApi from "../../hooks/api/axiosInterceptor";
import BasicInfo from "./Info";
import { DownOutlined, SwapLeftOutlined } from "@ant-design/icons";
import NavForProjectSide from "./nav";
import { useLocation, useNavigate } from "react-router-dom";
import NavForNotes from "./navForNotes";
import Note from "./note";
import Down from "./down";

const SideContainer = styled.div`
  transition: all 0.2s linear;
  width: 330px;
  min-height: 100%;
  padding: 10px;
  background-color: #333333;
  box-shadow: grey 0px 30px 20px -2em inset;
  .up {
    width: 100%;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .role {
      font-size: 15px;
      opacity: 0.6;
    }
    .pushback {
      font-size: 25px;
      cursor: pointer;
      transition: all 0.2s linear;
      opacity: 0.6;
      &:hover {
        opacity: 1;
      }
    }
  }

  .upward {
    transition: all 0.3s linear;
    transform: ${({ isUpWard, setOffHeight }) =>
      isUpWard ? "translateY(0px)" : `translateY(-${setOffHeight}px)`};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .downward {
    transition: all 0.3s linear;
    transform: ${({ isUpWard, setOffHeight }) =>
      isUpWard
        ? `translateY(${setOffHeight}px)`
        : `translateY(-${setOffHeight}px)`};
    width: 100%;
    height: calc(100% - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const UpAndDownContainer = styled.div`
  width: 330px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  font-size: 17px;
  color: white;
  left: 0;
  bottom: 0;
  box-shadow: -2px -76px 23px -81px rgba(255, 255, 255, 0.75) inset;
  -webkit-box-shadow: -2px -76px 23px -81px rgba(255, 255, 255, 0.75) inset;
  -moz-box-shadow: -2px -76px 23px -81px rgba(255, 255, 255, 0.75) inset;
  .icon {
    cursor: pointer;
    transform: ${({ isUpWard }) => (isUpWard ? "rotate(0)" : "rotate(180deg)")};
  }
`;

const roleParser = (currentUserId, participantList) => {
  const roleList = participantList.filter(({ id }) => id === currentUserId);
  return roleList[0]?.role.attr;
};

const SideWrapper = ({ projectId, userInfo }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [noteType, setNoteType] = useState("caution");
  const [historyCount, setHistoryCount] = useState(0);
  const [isUpWard, setIsUpWard] = useState(true);
  const [setOffHeight, setSetOffHeight] = useState(0);
  const [projectData, setProjectData] = useState({
    ctrType: {},
    detailCtrType: {},
    endDate: null,
    floorUrl: null,
    id: null,
    name: null,
    participantList: [
      {
        id: null,
        name: null,
        role: { attr: null, value: null },
      },
    ],
    processRate: null,
    startDate: null,
    thumbnailUrl: null,
  });

  const upWardRef = useRef(null);

  useEffect(() => {
    setSetOffHeight(upWardRef.current.offsetHeight + 50);
  }, [upWardRef]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await useApi.get(`/api/project/${projectId}`);
        setProjectData(data);
      } catch (err) {
        const { code } = err.response.data;
        if (code === -426) {
          alert("참여요청을 해주십시오.");
        }
        if (code === -412) {
          alert("요청 승인이 되지 않았습니다.");
        }
        window.history.back();
      }
    })();
  }, []);

  useEffect(() => {
    setHistoryCount((prev) => prev - 1);
  }, [pathname]);

  return (
    <SideContainer isUpWard={isUpWard} setOffHeight={setOffHeight}>
      <div className="up">
        <span
          className="pushback"
          onClick={() => {
            navigate(historyCount);
          }}
        >
          <SwapLeftOutlined />
        </span>
        <span className="role">
          {roleParser(userInfo?.id, projectData?.participantList)
            ? roleParser(userInfo?.id, projectData?.participantList)
            : userInfo?.role.attr}
        </span>
      </div>
      <div className="upward" ref={upWardRef}>
        <NavForProjectSide projectId={projectId} />
        <BasicInfo
          projectName={projectData?.name}
          thumbnailUrl={projectData?.thumbnailUrl}
          companyName={projectData?.company?.name}
        />
        <NavForNotes noteType={noteType} setNoteType={setNoteType} />
        <Note noteType={noteType} projectId={projectId} userInfo={userInfo} />
      </div>
      <div className="downward">
        <Down projectData={projectData} />
      </div>
      <UpAndDownContainer isUpWard={isUpWard}>
        <DownOutlined
          className="icon"
          onClick={() => setIsUpWard((prev) => !prev)}
        />
      </UpAndDownContainer>
    </SideContainer>
  );
};

export default SideWrapper;
