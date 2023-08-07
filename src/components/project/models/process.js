import styled from "@emotion/styled";
import { useOutletContext } from "react-router-dom";

const ProcessContainer = styled.div`
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

const Tempo = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

const Process = () => {
  const { projectId } = useOutletContext();

  return (
    <ProcessContainer>
      <Tempo>
        <span style={{ color: "white" }}>Process Page</span>
      </Tempo>
    </ProcessContainer>
  );
};

export default Process;
