import styled from "@emotion/styled";
import Participants from "./participants";
import { useState } from "react";
import { useParams } from "react-router-dom";

const DownContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const Down = ({ projectData }) => {
  const { projectId } = useParams();
  const [form, setForm] = useState({
    projectId: Number.parseInt(projectId),
    targetCrewId: 0,
    targetProjectRole: null,
  });
  return (
    <DownContainer>
      <Participants
        participantList={projectData?.participantList}
        form={form}
        setForm={setForm}
      />
    </DownContainer>
  );
};

export default Down;
