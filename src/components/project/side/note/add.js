import { CloseOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../../hooks/api/axiosInterceptor";

const AddContainer = styled.div`
  position: absolute;
  z-index: 100;
  top: ${({ scrollTop }) => scrollTop}px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;

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

const ContentContainer = styled.textarea`
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

const Add = ({
  newNote,
  setNewNote,
  noteType,
  setIsScrollBlocked,
  scrollTop,
}) => {
  const { projectId } = useParams();
  const [form, setForm] = useState({
    projectId: Number.parseInt(projectId),
    noteType,
    content: "",
  });

  const sendNote = async () => {
    try {
      await useApi.post("/api/note", form);
      setNewNote(!newNote);
      setIsScrollBlocked(false);
    } catch (error) {
      const { code } = error.response.data;

      if (code === -426) alert("접근 권한이 없습니다.");
      if (code === -411) alert("승인 대기중입니다.");
    }
  };
  return (
    <AddContainer scrollTop={scrollTop}>
      <div className="close">
        <span className="txt">새로운 메모작성</span>
        <div
          className="icon"
          onClick={() => {
            setNewNote(!newNote);
            setIsScrollBlocked(false);
          }}
        >
          <CloseOutlined />
        </div>
      </div>
      <ContentContainer
        onChange={(e) => {
          setForm((prev) => {
            return { ...prev, content: e.target.value };
          });
        }}
      />
      <button className="send" onClick={sendNote}>
        작성하기
      </button>
    </AddContainer>
  );
};

export default Add;
