import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const Button = styled.span`
  cursor: pointer;
  :hover {
    font-weight: bolder;
  }
`;

const BottomBtn = ({ className, to, textValue }) => {
  const navigate = useNavigate();

  return (
    <Button
      className={className}
      onClick={() => {
        navigate(to);
      }}
    >
      {textValue}
    </Button>
  );
};

export default BottomBtn;
