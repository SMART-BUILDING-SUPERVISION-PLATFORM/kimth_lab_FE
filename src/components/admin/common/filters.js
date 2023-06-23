import styled from "@emotion/styled";
import { Select, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const DropdownContainer = styled.div`
  width: 200px;
  height: 100%;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 200px;
  height: 100%;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: auto;
  height: 100%;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const { Option } = Select;

const DropDownWrapper = ({ list, setFilter }) => {
  const handleOptionChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      [list.className]: e,
    }));
  };
  return (
    <DropdownContainer>
      {[list].map(({ label, option }) => (
        <Select
          key={label}
          placeholder={label}
          onChange={handleOptionChange}
          style={{ width: "130px", marginRight: "10px" }}
        >
          {option?.map(({ label, value }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      ))}
    </DropdownContainer>
  );
};
const SearchWrapper = ({ setFilter }) => {
  const handleOptionChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };
  return (
    <InputContainer>
      <Input
        placeholder="프로젝트 검색"
        style={{ border: "none" }}
        onChange={handleOptionChange}
      />
    </InputContainer>
  );
};

const SerachButton = ({ filter, setFilter }) => {
  return (
    <ButtonContainer>
      <Button
        type="text"
        icon={<SearchOutlined style={{ color: "#aaa", fontSize: 16 }} />}
        onClick={() => setFilter(filter)}
      />
    </ButtonContainer>
  );
};

export { DropDownWrapper, SearchWrapper, SerachButton };
