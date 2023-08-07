import styled from "@emotion/styled";
import {
  DropDownWrapper,
  SearchWrapper,
} from "../../../../admin/common/filters";
import { ctrTypeList } from "../../../../../types/parameters";
import companyListCaller from "../../../../hooks/api/companyCaller";
import { useEffect, useState } from "react";

const FilterContainer = styled.div`
  font-size: 15px;
  color: black;
  display: flex;
  flex-direction: row;
  width: auto;
  align-items: center;
  background-color: transparent;
`;

const FilterForProject = ({ filter, setFilter }) => {
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    (async () => {
      setCompanyList(await companyListCaller());
    })();
  });

  return (
    <FilterContainer>
      <DropDownWrapper list={ctrTypeList[0]} setFilter={setFilter} />
      <DropDownWrapper list={ctrTypeList[1]} setFilter={setFilter} />
      <DropDownWrapper list={companyList} setFilter={setFilter} />
      <SearchWrapper
        filter={filter}
        setFilter={setFilter}
        placeholder="프로젝트명"
      />
    </FilterContainer>
  );
};

export default FilterForProject;
