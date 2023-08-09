import { CloseOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/api/axiosInterceptor";

const MoreContainer = styled.div`
  position: absolute;
  top: ${({ scrollTop }) => scrollTop}px;
  left: 0;
  z-index: 4;
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  .close {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .txt {
      font-size: 18px;
      color: white;
    }
    .icon {
      color: white;
      font-size: 25px;
      cursor: pointer;
    }
  }

  .send {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: #1777ff;
    color: white;
    border: none;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    width: 100%;
    display: flex;
    align-items: baseline;
    color: white;
    .name {
      font-size: 20px;
      margin-right: 5px;
      cursor: pointer;
    }
    .role {
      font-size: 15px;
    }
  }

  .rest {
    display: flex;
    color: white;
    .txt {
      margin-left: 10px;
    }
    &:last-of-type {
      margin-bottom: 15px;
    }
  }
`;

const ContentContainer = styled.p`
  width: 100%;
  height: 150px;
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 15px;
  resize: none;
  background-color: rgba(255, 255, 255, 1);
  color: black;
  margin-bottom: 20px;
  padding: 10px;
`;

const ReplyContainer = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  margin: 0;
  border: none;
  outline: none;
  font-size: 15px;
  resize: none;
  background-color: rgba(255, 255, 255, 0.9);
  color: black;
  margin-bottom: 20px;
`;

const More = ({
  note,
  setIsScrollBlocked,
  setMore,
  projectId,
  scrollTop,
  replier,
}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    noteId: note?.id,
    reply: "",
    projectId: Number.parseInt(projectId),
  });
  const sendReply = async () => {
    try {
      await useApi.put(`/api/note`, form);

      setMore(false);
      setIsScrollBlocked(false);
    } catch (err) {
      const { code } = err.response.data;

      if (code === -426) alert("참여중인 프로젝트가 아닙니다.");
      if (code === -412) alert("접근 권한이 없습니다.");
      if (code === -413) alert("이미 답변이 존재합니다.");
      if (code === -427) alert("노트가 존재하지 않습니다.");
    }
  };
  return (
    <MoreContainer scrollTop={scrollTop}>
      <div className="close">
        <span className="txt">답변 작성</span>
        <div
          className="icon"
          onClick={() => {
            setMore(false);
            setIsScrollBlocked(false);
          }}
        >
          <CloseOutlined />
        </div>
      </div>
      <ProfileContainer>
        <div className="top">
          <div
            className="name"
            onClick={() =>
              navigate(`/${note?.writer?.id}/project-participanting`)
            }
          >
            {note?.writer?.name}
          </div>
          <div className="role">{note?.writer?.role?.value}</div>
        </div>
        <div className="rest">
          <MailOutlined />
          <div className="txt">{note?.writer?.email}</div>
        </div>
        <div className="rest">
          <PhoneOutlined />
          <div className="txt">{note?.writer?.phone}</div>
        </div>
      </ProfileContainer>
      <ContentContainer>{note?.content}</ContentContainer>
      {!replier ? (
        <>
          <ReplyContainer
            placeholder="답변을 작성해주세요."
            onChange={(e) => {
              setForm((prev) => {
                return { ...prev, reply: e.target.value };
              });
            }}
          />
          <button className="send" onClick={sendReply}>
            답변 등록
          </button>
        </>
      ) : (
        <>
          <ProfileContainer>
            <div className="top">
              <div
                className="name"
                onClick={() =>
                  navigate(`/${replier?.id}/project-participanting`)
                }
              >
                {replier?.name}
              </div>
              <div className="role">{replier?.role?.value}</div>
            </div>
            <div className="rest">
              <MailOutlined />
              <div className="txt">{replier?.email}</div>
            </div>
            <div className="rest">
              <PhoneOutlined />
              <div className="txt">{replier?.phone}</div>
            </div>
          </ProfileContainer>
          <ContentContainer>{note?.reply}</ContentContainer>
        </>
      )}
    </MoreContainer>
  );
};

export default More;
