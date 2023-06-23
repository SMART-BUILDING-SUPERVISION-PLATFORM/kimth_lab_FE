import styled from "@emotion/styled";
import useApi from "../../hooks/api/axiosInterceptor";
import { useState } from "react";

const SideBar = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 20px;
`;

// 회원이 참여하고 있는 프로젝트 리스트 출력
const MyPage = (userInfo) => {
  const [myInfo, setMyInfo] = useState();
  const [myProjectList, setMyProjectList] = useState();

  // props로 받아오기
  const LoadInfo = async () => {
    try {
      setMyInfo(await useApi.get("/api/crew").data);
      setMyProjectList(await useApi.get("/api/project").data);
      console.log(myInfo, myProjectList);
    } catch (e) {
      console.log(e);
    }
  };

  LoadInfo();

  return (
    <SideBar>
      <div>
        <div>내 정보</div>
        <div>업종</div>
        <div>참여 프로젝트</div>
        <div>참여 대기중 프로젝트</div>
      </div>
    </SideBar>
  );
};

export default MyPage;
