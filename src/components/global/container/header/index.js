import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useApi from "../../../hooks/api/axiosInterceptor";

const HeaderContainer = styled.header`
  background-color: black;
  /* position: absolute; */
  /* width: 100vw; */
  display: block;
  height: 50px;
  justify-content: left;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
`;
const Title = styled.h1`
  color: #fff;
  margin-left: 10px;
  line-height: 50px; /* Title 요소의 높이를 부모인 HeaderContainer의 높이와 동일하게 설정 */
`;

const Header = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({
    name: "",
  });
  const { name } = userInfo;
  useEffect(() => {
    (async () => {
      setUserInfo((await useApi.get("/api/crew")).data);
    })();
  }, [location]);
  return (
    <HeaderContainer>
      <Title>Digital Construction Supervison Platform</Title>
      {name}님 해윙
    </HeaderContainer>
  );
};

export default Header;
