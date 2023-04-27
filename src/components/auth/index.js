import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import img_bg from "../../assets/img/signin_bg.avif";
import img_logo from "../../assets/img/snust_main.png";

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden; // 이미지 넘치는 부분은 잘려서 보여지지 않음
  .img_bg {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.5; // 이미지 투명도
    object-fit: cover; // 화면 채우기
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 400px;
    top: 20px; // top: 절대위치, margin-top: 상대위치
    /* z-index: 2; // 수직 위치 지정 */
    .img_logo {
      width: 200px;
      margin-bottom: 20px;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .formbox {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    width: 100%;
    padding: 10px 0 10px 0;
    top: 200px;
  }
`;

const Member = () => {
  const pathname = useLocation();
  const [path, setPath] = useState(pathname);
  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  return (
    <MemberContainer>
      <img src={img_bg} alt="img" className="img_bg" />
      <div className="header">
        <img src={img_logo} alt="img" className="img_logo" />
        <span className="title">SMART BUILDING SUPERVISION PLATFORM</span>
      </div>
      <Container pathname={path} className="container">
        <div className="formbox">
          <Outlet />
        </div>
      </Container>
    </MemberContainer>
  );
};

export default Member;
