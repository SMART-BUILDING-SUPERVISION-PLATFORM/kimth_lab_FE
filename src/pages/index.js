import styled from "@emotion/styled";

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 50px;
`;

const Main = () => {
  return (
    <MainContainer>
      <h1>CI/CD Final Test</h1>
    </MainContainer>
  );
};

export default Main;
