import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import LoadingWrapper from "../../common/exceptionComponent/loading";
import useApi from "../../hooks/api/axiosInterceptor";
import { OBJModel } from "react-3d-viewer";

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
  .modelViewer {
    width: inherit;
    height: inherit;
    background-color: #333333;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const View = () => {
  const { projectId } = useOutletContext();
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);
  const [res, setRes] = useState("");

  const loadingRef = useRef(null);

  useEffect(() => {
    if (isFrameLoaded) {
      loadingRef.current.style.opacity = 0;
      setTimeout(() => {
        loadingRef.current.style.display = "none";
      }, 500);
    }
  }, [isFrameLoaded]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await useApi.get(
          `/api/project/python/panorama/${projectId}`
        );
        if (data.length === 0) {
          alert("파노라마가 아직 등록되지 않았습니다.");
          window.location.href = "/home";
        } else {
          const res = await fetch(`http://127.0.0.1:8000/panorama`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              projectId,
              panoBase64: data[0]?.src,
            }),
          });
          const pyData = await res.json();
          setRes(
            `http://127.0.0.1:8000/static/project_${pyData?.projectId}.obj`
          );
        }
      } catch (e) {
        alert("Server error.");
      }
    })();
  });

  return (
    <ViewContainer isFrameLoaded={isFrameLoaded}>
      <div className="modelViewer">
        {res && (
          <OBJModel
            width={1100}
            height={800}
            src={res}
            onLoad={async () => setIsFrameLoaded(true)}
            onProgress={(xhr) => setIsFrameLoaded(false)}
          />
        )}
      </div>
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
