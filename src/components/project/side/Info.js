import { CloseSquareOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

const BasicInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.6);

  .titleBox {
    width: 100%;
    display: flex;
    justify-content: space-between;

    margin-bottom: 10px;
    .title {
      font-size: 15px;
      font-weight: bold;
    }
    .company {
      font-size: 15px;
    }
  }
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  height: 230px;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 10px;
  .thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BasicInfo = ({ projectName, thumbnailUrl, companyName }) => {
  return (
    <BasicInfoContainer>
      <div className="titleBox">
        <span className="title">{projectName}</span>
        <span className="company">{companyName}</span>
      </div>
      <ThumbnailContainer>
        {thumbnailUrl === "" ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CloseSquareOutlined
              style={{
                opacity: 0.5,
              }}
            />
          </div>
        ) : (
          <img className="thumbnail" src={thumbnailUrl} alt="thumbnail" />
        )}
      </ThumbnailContainer>
    </BasicInfoContainer>
  );
};

export default BasicInfo;
