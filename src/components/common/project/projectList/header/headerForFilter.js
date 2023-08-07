import styled from "@emotion/styled";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useOutletContext } from "react-router-dom";
import FilterForProject from "./filter";

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: transparent;
  .addProject {
    background-color: #1777ff;
    margin-right: 10px;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Header = ({ filter, setFilter }) => {
  const navigate = useNavigate();
  const {
    userInfo: { role },
  } = useOutletContext();

  return (
    <HeaderWrapper>
      <Button
        className="addProject"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => navigate("/new")}
        disabled={
          role?.attr !== "SERVICE_ADMIN" && role?.attr !== "COMPANY_ADMIN"
        }
      >
        New Project
      </Button>
      <FilterForProject filter={filter} setFilter={setFilter} />
    </HeaderWrapper>
  );
};

export default Header;
