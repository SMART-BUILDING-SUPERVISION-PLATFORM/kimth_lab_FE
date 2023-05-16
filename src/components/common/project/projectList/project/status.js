import styled from "@emotion/styled";

const StatusContainer = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  .label {
    height: 20px;
    margin-left: 6px;
    margin-top: 20px;
    font-size: 13px;
    font-weight: bold;
  }
`;

const StatusBox = styled.div`
  margin: 10px 6px 6px 6px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  height: 50px;
  .value {
    font-size: 20px;
    text-align: center;
  }
`;

const Status = ({ label, value }) => {
  return (
    <StatusContainer>
      <div className="label">{label}</div>
      <div style={{ height: "20px" }}></div>
      <StatusBox>
        <div className="value">{value}</div>
      </StatusBox>
    </StatusContainer>
  );
};

export default Status;
