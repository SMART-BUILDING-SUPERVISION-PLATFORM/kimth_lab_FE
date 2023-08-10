import styled from "@emotion/styled";
import { Outlet, useParams } from "react-router-dom";
import ProfileWrapper from "../components/mypage/profile";
import FilterWrapper from "../components/mypage/filter";
import { useEffect, useState } from "react";
import useApi from "../components/hooks/api/axiosInterceptor";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
`;

const OutletContainer = styled.div`
  width: 100%;
  height: calc(100%);
  display: flex;
  flex-direction: column;
  overflow: scroll;
  margin-bottom: 20px;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    company: { id: "", name: "", address: "" },
    email: "",
    id: "",
    name: "",
    pending: false,
    phone: "",
    role: { attr: "", value: "" },
  });
  const { id: crewId } = useParams();

  useEffect(() => {
    try {
      (async () => {
        const { data } = await useApi.get(`/api/crew/${crewId}`);
        setUserInfo(data);
      })();
    } catch (err) {
      const { code } = err.response;
      if (code === -423) alert("존재하지 않는 유저입니다.");
    }
  }, []);

  const [filter, setFilter] = useState({
    name: null,
    ctrType: null,
    detailCtrType: null,
    companyId: null,
    onlyMine: true,
    isPending: false,
  });
  return (
    <MainContainer>
      <ProfileWrapper userInfo={userInfo} />
      <FilterWrapper
        filter={filter}
        setFilter={setFilter}
        crewId={crewId}
        userInfo={userInfo}
      />
      <OutletContainer>
        <Outlet context={{ filter, userInfo }} />
      </OutletContainer>
    </MainContainer>
  );
};

export default MyPage;
