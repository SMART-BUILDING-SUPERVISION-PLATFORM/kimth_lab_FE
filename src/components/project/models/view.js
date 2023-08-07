import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import LoadingWrapper from "../../common/exceptionComponent/loading";

const ViewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .disappearLinear {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease-in-out;
  }
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

const View = () => {
  const { projectId } = useOutletContext();
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);

  const loadingRef = useRef(null);

  useEffect(() => {
    if (isFrameLoaded) {
      loadingRef.current.style.opacity = 0;
      setTimeout(() => {
        loadingRef.current.style.display = "none";
      }, 500);
    }
  }, [isFrameLoaded]);
  return (
    <ViewContainer isFrameLoaded={isFrameLoaded}>
      <Iframe
        src={`http://localhost:8000/`}
        onConne
        onLoad={async () => {
          setTimeout(() => {
            setIsFrameLoaded(true);
          }, 1500);
        }}
        title="view"
      />

      <div className="disappearLinear" ref={loadingRef}>
        <LoadingWrapper
          color="white"
          backgroundColor="#1e1e1e"
          children={
            <span
              style={{
                textAlign: "center",
                fontSize: "12px",
                fontWeight: "bold",
                transform: "translateX(-175%)",
                color: "white",
              }}
            >
              Hold <br /> tight!
            </span>
          }
        />
      </div>
    </ViewContainer>
  );
};

export default View;
