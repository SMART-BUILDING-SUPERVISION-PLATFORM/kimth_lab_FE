import styled from "@emotion/styled";
import ctrTypeList from "../../../types/parameters";
import React, { useState } from "react";
import { Select } from "antd";

const DropdownContainer = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: row;
`;

const { Option } = Select;

//
//
//

const FilterDropdown = ({ onFilterChange }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (className, value) => {
    setSelectedOptions(
      (prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [className]: value,
      }),
      () => {
        // Pass the selected filter values to the parent component
        onFilterChange(selectedOptions);
      }
    );
  };

  return (
    <DropdownContainer>
      {ctrTypeList?.map(({ label, className, option }) => (
        <Select
          key={className}
          placeholder={label}
          onChange={(value) => handleOptionChange(className, value)}
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

export default FilterDropdown;
