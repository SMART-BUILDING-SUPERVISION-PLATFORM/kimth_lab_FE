import { CloseOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../../hooks/api/axiosInterceptor";

const UpLoadContainer = styled.div`
  position: absolute;
  top: -45.875px;
  left: -10px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-bottom: 40px;
  width: calc(100% + 20px);
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 200;
  .close {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .txt {
      font-size: 18px;
      color: white;
    }
    .icon {
      color: white;
      font-size: 25px;
      cursor: pointer;
    }
  }
`;

const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  .item {
    width: 100%;
    margin-bottom: 10px;

    .src {
      width: 100%;
      object-fit: cover;
    }
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  .send,
  .retry {
    width: 100%;
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
        <span className="txt">이미지 업로드</span>
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
