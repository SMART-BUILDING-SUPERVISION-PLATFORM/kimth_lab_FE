import styled from "@emotion/styled";
import { Input, Button } from "antd";
import { useState } from "react";
import {
  PlusOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 20px;
  .count {
    margin: 18px 0px 0px 10px;
    /* border: 2px solid black; */
    color: black;
    font-size: 15px;
  }
  .right {
    display: flex;
    flex-direction: row;
    width: auto;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: row;
`;

const Header = ({ companyId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleAddProjectClick = () => {
    setIsModalVisible(true);
  };

  return (
    <HeaderWrapper>
      {/* TODO: project count */}
      <span className="count">?? Projects</span>
      <div className="right">
        {/* TODO: button modularize */}
        <Button
          className="addProject"
          type="primary"
          icon={<PlusOutlined style={{ marginRight: "10px" }} />}
          // onClick={handleAddProjectClick}
        >
          새 프로젝트 추가
        </Button>
        <Button
          className="filter"
          type="text"
          icon={<FilterOutlined />}
          // onClick={ }
        >
          필터
        </Button>
        <SearchWrapper>
          <Input placeholder="프로젝트 검색" style={{ border: "none" }} />
          <Button
            type="text"
            icon={<SearchOutlined style={{ color: "#aaa", fontSize: 16 }} />}
            // onClick={ }
          />
        </SearchWrapper>
      </div>
      {/*       
      <AddProjectModal
        companyId={companyId}
        visible={isModalVisible}
        onClose={handleModalClose}
      /> */}
    </HeaderWrapper>
  );
};

export default Header;
