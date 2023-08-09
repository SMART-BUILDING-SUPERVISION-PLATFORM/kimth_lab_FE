import { CloseOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../../../../hooks/api/axiosInterceptor";

const UpLoadContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 200;
  .close {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    background-color: rgba(0, 0, 0, 0.9);
    padding: 10px;
    border-radius: 10px;
    color: white;

    .txt {
      font-size: 18px;
    }
    .icon {
      font-size: 25px;
      cursor: pointer;
    }
  }
`;

const PreviewContainer = styled.div`
  height: 500px;
  display: flex;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  .item {
    margin-right: 20px;
    .src {
      height: 100%;
      object-fit: cover;
    }
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .send,
  .retry {
    width: 200px;
    height: 40px;
    border-radius: 5px;
    background-color: #1777ff;
    color: white;
    border: none;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    &:first-of-type {
      margin-bottom: 10px;
    }
  }
`;

const UpLoad = ({ setIsUploadOpen }) => {
  const ref = useRef(null);
  const { projectId } = useParams();
  const [panoramaSrcList, setPanoramaSrcList] = useState([]);
  const handleFileChange = (e) => {
    setPanoramaSrcList([]);
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        setPanoramaSrcList((prevImages) => [...prevImages, base64]);
      };

      reader.readAsDataURL(file);
    });
  };

  const onSend = async () => {
    if (panoramaSrcList.length === 0) {
      alert("파노라마를 등록해주세요");
      return;
    }
    try {
      await useApi.post(`/api/project/${projectId}`, {
        panoramaSrcList,
      });
      alert("파노라마가 등록되었습니다.");
      setIsUploadOpen(false);
    } catch (error) {
      alert("접근권한이 없습니다.");
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.click();
    }
  }, []);
  return (
    <UpLoadContainer>
      <div className="close">
        <span className="txt">파노라마 업로드</span>
        <div className="icon" onClick={() => setIsUploadOpen(false)}>
          <CloseOutlined />
        </div>
      </div>
      <input
        ref={ref}
        type="file"
        multiple
        style={{
          display: "none",
        }}
        onChange={handleFileChange}
      />
      {
        <PreviewContainer>
          {panoramaSrcList.map((panorama) => (
            <div className="item" key={panorama}>
              <img
                className="src"
                src={`data:image/jpeg;base64,${panorama}`}
                alt="preview"
              />
            </div>
          ))}
        </PreviewContainer>
      }
      <BottomContainer>
        <button className="send" onClick={onSend}>
          등록
        </button>
        <button
          className="retry"
          onClick={() => {
            setPanoramaSrcList([]);
            ref.current.click();
          }}
        >
          재등록
        </button>
      </BottomContainer>
    </UpLoadContainer>
  );
};

export default UpLoad;
