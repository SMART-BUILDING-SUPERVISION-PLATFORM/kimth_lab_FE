import {
  CheckCircleOutlined,
  DeleteOutlined,
  LoginOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import useApi from "../../../../../hooks/api/axiosInterceptor";
import { useState } from "react";
import UpLoad from "./upload";
import { useLocation, useNavigate } from "react-router-dom";

const SetUpContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  .icon {
    margin-left: 15px;
    color: rgba(0, 0, 0, 0.5);
    transition: all 0.2s linear;
    font-size: 19px;
    cursor: pointer;
    &:hover {
      color: #1777ff;
    }
  }
  .del {
    margin-left: 15px;
    color: rgba(0, 0, 0, 0.5);
    transition: all 0.2s linear;
    font-size: 19px;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
  .notRequested {
    cursor: pointer;
    margin-left: 15px;
    color: #1777ff;
    transition: all 0.2s linear;
    font-size: 19px;
  }
  .requested {
    margin-left: 15px;
    color: #2eb82e;
    transition: all 0.2s linear;
    font-size: 19px;
  }
`;

const SetUp = ({ projectId, userInfo, isSameCompany, isHome, isSa }) => {
  const pathname = useLocation().pathname.split("/")[2];
  const [isRequested, setIsRequested] = useState(false);
  const navigate = useNavigate();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const deleteProject = async (projectId) => {
    try {
      await useApi.delete(`/api/project/${projectId}`);
      alert("프로젝트 삭제 완료");
      window.location.href = "/home";
    } catch (err) {
      const { code } = err.response.data;
      if (code === -412) alert("접근 권한이 없습니다.");
    }
  };

  const requestToJoin = async () => {
    try {
      await useApi.post(`/api/participant/${projectId}`);
      setIsRequested(true);
      alert("참여 요청 완료");
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
    <>
      {isUploadOpen && (
        <UpLoad setIsUploadOpen={setIsUploadOpen} projectId={projectId} />
      )}
      <SetUpContainer isRequested={isRequested}>
        {pathname !== "project-pending" && (
          <>
            <div className="icon" onClick={() => setIsUploadOpen(true)}>
              <UploadOutlined />
            </div>
            <div
              className="icon"
              onClick={() => navigate(`/update/${projectId}`)}
            >
              <SettingOutlined />
            </div>
            <div className="del" onClick={() => deleteProject(projectId)}>
              <DeleteOutlined />
            </div>
          </>
        )}

        {isHome &&
          (isRequested ? (
            <div className="requested">
              <CheckCircleOutlined />
            </div>
          ) : (
            <div className="notRequested" onClick={requestToJoin}>
              <LoginOutlined />
            </div>
          ))}
      </SetUpContainer>
    </>
  );
};

export default SetUp;
