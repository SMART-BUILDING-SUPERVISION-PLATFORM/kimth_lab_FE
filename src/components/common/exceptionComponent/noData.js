import styled from "@emotion/styled";
import { CloseCircleOutlined } from "@ant-design/icons";

const NoDataContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;

  .noData {
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      width: 90px;
      height: 90px;
      font-size: 50px;
      color: ${({ color }) => color};
    }
    .txt {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 30px;
      color: ${({ color }) => color};
    }
    .reload {
      width: 100%;
      height: 30px;
      border-radius: 5px;
      background-color: #1777ff;
      color: white;
      border: none;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;

const NoData = ({ color, reload }) => {
  return (
    <NoDataContainer color={color}>
      <div className="noData">
        <CloseCircleOutlined className="icon" />
        <span className="txt">No Data</span>
        {reload && (
          <button
            className="reload"
            onClick={() => {
              window.location.reload();
            }}
          >
            ReLoad
          </button>
        )}
      </div>
    </NoDataContainer>
  );
};

export default NoData;
