import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useApi from "../../../hooks/api/axiosInterceptor";
import My from "./my";

const HeaderContainer = styled.header`
  height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: black;
  padding: 0 50px;
  font-size: 24px;
  font-weight: bold;
`;

const Title = styled.h1`
  display: block;
  color: white;
  line-height: 50px;
  cursor: pointer;
`;

const Header = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({
    company: {
      address: null,
      id: null,
      name: null,
    },
    email: null,
    id: null,
    name: null,
    pending: false,
    phone: null,
    role: { attr: null, value: null },
  });

  useEffect(() => {
    (async () => {
      setUserInfo((await useApi.get("/api/crew")).data);
    })();
  }, [location]);

  return (
    <HeaderContainer>
      <Title
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Smart Building Supervision Platform
      </Title>
      <My userInfo={userInfo} />
    </HeaderContainer>
  );
};

export default Header;
