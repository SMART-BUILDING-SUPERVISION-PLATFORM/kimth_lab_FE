import styled from "@emotion/styled";
import { Input, Button } from "antd";
import { useState } from "react";
import {
  PlusOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import FilterDropdown from "../../../filter";
import { useNavigate } from "react-router-dom";

const HeaderWrapper = styled.div`
  display: flex;
  /* position: fixed; */
  width: 100%;
  height: 60px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 10px; // 위 오른쪽 아래 왼쪽
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  .count,
  .right {
    font-size: 15px;
    color: black;
    display: flex;
    flex-direction: row;
    width: auto;
    align-items: center;
    .addProject {
      width: 180px;
      background-color: #1777ff;
      color: #fff;
      margin-right: 10px;
      box-shadow: 0 5px 8px rgba(0, 0, 0, 0.15);
    }
    .filter {
      margin-right: 10px;
      background-color: rgba(0, 0, 0, 0.15);
      box-shadow: 0 5px 8px rgba(0, 0, 0, 0.15);
      color: black;
    }
  }
`;

const SearchWrapper = styled.div`
  border: none;
  width: 200px;
  height: 30px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); */
  border: 0.5px solid lightgray;
  display: flex;
  flex-direction: row;
`;

const Header = ({ numberOfProject, onFilterChange }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const navigate = useNavigate();

  // TODO: projectList의 filter에 값 전달??
  const handleFilterClick = () => {
    setIsFilterVisible(true);
    onFilterChange();
  };

  //
  //
  //

  return (
    <HeaderWrapper isVisible={isFilterVisible}>
      <span className="count">{numberOfProject} Projects</span>
      <div className="right">
        {/* TODO: button modularize */}
        <Button
          className="addProject"
          type="primary"
          icon={<PlusOutlined style={{ marginRight: "10px" }} />}
          onClick={navigate("project/add")}
        >
          새 프로젝트 추가
        </Button>
        <FilterDropdown onFilterChange={onFilterChange} />
        <SearchWrapper>
          <Input placeholder="프로젝트 검색" style={{ border: "none" }} />
          <Button
            type="text"
            icon={<SearchOutlined style={{ color: "#aaa", fontSize: 16 }} />}
            // onClick={ }
          />
        </SearchWrapper>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
