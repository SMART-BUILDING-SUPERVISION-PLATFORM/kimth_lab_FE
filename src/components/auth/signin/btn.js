import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const Button = styled.span`
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease-in-out;
  :hover {
    color: rgba(255, 255, 255, 1);
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
