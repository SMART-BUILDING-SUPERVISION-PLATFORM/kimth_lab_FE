import { useNavigate } from "react-router-dom";

const BottomBtn = ({ className, to, textValue }) => {
  const navigate = useNavigate();
  return (
    <span
      style={{ cursor: "pointer" }}
      className={className}
      onClick={() => {
        navigate(to);
      }}
    >
      {textValue}
    </span>
  );
};

export default BottomBtn;
