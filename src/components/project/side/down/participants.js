import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { DropDownWrapper } from "../../../admin/common/filters";
import { projectRoleTypes } from "../../../../types/parameters";
import useApi from "../../../hooks/api/axiosInterceptor";

const ParticipantsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  .up {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .title {
      width: 100%;
      font-size: 17px;
      color: white;
    }
    .number {
      font-size: 15px;
      color: white;
    }
  }
`;

const ParticipantListContainer = styled.ul`
  width: 100%;
  min-height: 450px;
  padding: 10px;
  margin-top: 20px;
  box-shadow: -1px 0px 21px -5px rgba(255, 255, 255, 0.75) inset;
  -webkit-box-shadow: -1px 0px 21px -5px rgba(255, 255, 255, 0.75) inset;
  -moz-box-shadow: -1px 0px 21px -5px rgba(255, 255, 255, 0.75) inset;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: scroll;
  margin-bottom: 5px;
  .item {
    width: 100%;
    height: 35px;
    padding: 0 5px;
    display: flex;
    border-radius: 5px;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 15px;
    margin-bottom: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    .role {
      font-size: 13px;
      opacity: 0.6;
    }
    .name {
      cursor: pointer;
      font-size: 18px;
      margin-right: 5px;
    }
    &:nth-of-type(${({ selectedIndex }) => selectedIndex + 1}) {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  .up {
    width: 100%;
    height: 40px;
    .name {
      font-size: 15px;
    }
  }

  .change,
  .delete,
  .upload,
  .setting,
  .eliminate {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    font-size: 15px;
    background-color: #1777ff;
    color: white;
    border: none;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .change {
    background-color: #1777ff;
  }
  .delete {
    background-color: red;
  }
  .upload {
    background-color: #1777ff;
  }
  .setting {
    background-color: #1777ff;
  }
  .eliminate {
    background-color: red;
  }
`;

const Participants = ({ participantList, form, setForm }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedParticipant, setSelectedParticipant] = useState({
    id: 0,
    name: "",
  });

  useEffect(() => {
    setSelectedParticipant(participantList[selectedIndex]);
    setForm((prev) => {
      return {
        ...prev,
        targetCrewId: participantList[selectedIndex]?.id,
      };
    });
  }, [selectedIndex]);

  const changeRole = async (form) => {
    try {
      await useApi.put(`/api/participant`, form);
      alert("권한 변경 완료");
    } catch (err) {
      const { code } = err.response.data;

      if (code === -426) alert("해당 인원을 찾을 수 없습니다.");
      if (code === -412) alert("접근 권한이 없습니다.");
      if (code === -414) alert("본인의 권한은 변경할 수 없습니다.");
    }
  };

  const deleteParticipant = async (form) => {
    try {
      const params = {
        projectId: form.projectId,
        targetCrewId: form.targetCrewId,
      };

      await useApi.delete(`/api/participant`, {
        params,
      });
      alert("삭제 완료");
    } catch (err) {
      const { code } = err.response.data;

      if (code === -426) alert("해당 인원을 찾을 수 없습니다.");
      if (code === -412) alert("접근 권한이 없습니다.");
      if (code === -414) alert("본인의 삭제할 수 없습니다.");
    }
  };

  return (
    <ParticipantsContainer>
      <div>
        <div className="up">
          <span className="title">프로젝트 참여자</span>
          <span className="number">{participantList.length}</span>
        </div>
        <ParticipantListContainer selectedIndex={selectedIndex}>
          {participantList?.map((participant, index) => (
            <li
              className="item"
              onClick={() => {
                setSelectedIndex(index);
              }}
            >
              <span className="name">{participant?.name}</span>
              <span className="role">{participant?.role?.value}</span>
            </li>
          ))}
        </ParticipantListContainer>
        <BottomContainer>
          <div className="up">
            <DropDownWrapper list={projectRoleTypes} setFilter={setForm} />
            <span className="name">
              {selectedParticipant?.name === undefined
                ? "참여자 선택"
                : selectedParticipant?.name}
            </span>
          </div>
          <button className="change" onClick={() => changeRole(form)}>
            권한 변경
          </button>
          <button className="delete" onClick={() => deleteParticipant(form)}>
            참여자 삭제
          </button>
        </BottomContainer>
      </div>
    </ParticipantsContainer>
  );
};

export default Participants;
