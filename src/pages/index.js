import styled from "@emotion/styled";

const Container = styled.div`
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
    <Container>
      <h1>
        Powered by <a href="https://vercel.com/">Vercel</a>
        test2
      </h1>
    </Container>
  );
};

export default Main;
