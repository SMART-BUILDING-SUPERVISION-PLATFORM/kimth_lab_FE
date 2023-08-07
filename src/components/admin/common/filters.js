import styled from "@emotion/styled";
import { Select, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const DropdownContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const InputContainer = styled.form`
  height: 30px;
  border: 0.5px solid lightgray;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
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
          {option?.map(
            ({ label: lb, value }) =>
              value && (
                <Option key={lb} value={value}>
                  {lb}
                </Option>
              )
          )}
        </Select>
      ))}
    </DropdownContainer>
  );
};
const SearchWrapper = ({ setFilter, placeholder }) => {
  const [name, setName] = useState(null);
  return (
    <InputContainer
      onSubmit={(e) => {
        if (name === null || name === "") {
          alert("검색어를 입력해주세요.");
          return;
        }

        e.preventDefault();
        setFilter((prev) => ({
          ...prev,
          name: name,
        }));
      }}
    >
      <Input
        placeholder={placeholder}
        style={{ border: "none" }}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        type="text"
        icon={<SearchOutlined style={{ color: "#aaa", fontSize: 16 }} />}
        onClick={() => {
          if (name === null || name === "") {
            alert("검색어를 입력해주세요.");
            return;
          }
          setFilter((prev) => ({
            ...prev,
            name: name,
          }));
        }}
      />
    </InputContainer>
  );
};

export { DropDownWrapper, SearchWrapper };
