import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import mp4_bg from "../../assets/mp4/construction_site.mp4";

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .mp4_bg {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    opacity: 0.95;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Member = () => {
  const pathname = useLocation();
  const [path, setPath] = useState(pathname);
  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  return (
    <MemberContainer>
      <div className="mp4_bg">
        <video autoPlay loop muted>
          <source src={mp4_bg} />
        </video>
      </div>
      <Container pathname={path} className="container">
        <Outlet />
      </Container>
    </MemberContainer>
  );
};

export default Member;
