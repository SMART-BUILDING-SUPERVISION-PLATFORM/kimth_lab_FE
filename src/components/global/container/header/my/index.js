import styled from "@emotion/styled";
import Nav from "./nav";

const MyContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  color: white;
  font-size: 12px;
  .companyContainer {
    min-width: 50px;
    display: flex;
    justify-content: center;
  }
  .userContainer {
    min-width: 50px;
    display: flex;
    justify-content: center;
  }
`;

const My = ({
  userInfo: {
    company: { name: companyName },
    name,
    role: { attr: role },
  },
}) => {
  return (
    <MyContainer>
      <div className="companyContainer">
        <span>{companyName}</span>
      </div>
      <div className="userContainer">
        <span>{name}님</span>
      </div>
      <Nav role={role} />
    </MyContainer>
  );
};

export default My;
