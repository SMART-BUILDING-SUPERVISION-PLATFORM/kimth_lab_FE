import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

const OverviewContainer = styled.div`
  width: calc(100% - 20px);
  .up {
    display: flex;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    .txtBox {
      width: 100%;
      span {
        color: black;
        height: 30px;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
`;

const OverviewBox = () => {
  const location = useLocation();
  return (
    <OverviewContainer>
      <div className="up">
        <div className="txtBox">
          <span>
            {location.pathname === "/home" ? "All Project" : "Administrator"}
          </span>
        </div>
      </div>
    </OverviewContainer>
  );
};

export default OverviewBox;
