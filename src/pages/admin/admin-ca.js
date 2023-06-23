import styled from "@emotion/styled";
import Tabs from "../../components/common/tab";
import { Outlet } from "react-router-dom";
import OutletWrapper from "../../components/admin/common/outletContainer";
import adminItem from "../../components/admin/common/adminItem";
import { useState } from "react";
import {
  DropDownWrapper,
  SearchWrapper,
  SerachButton,
} from "../../components/admin/common/filters";
import { roleTypes } from "../../types/parameters";

const AdminContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 50px 0 50px;
`;

const FilterContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
`;

const FilterForNewbie = ({ setFilter }) => {
  const [filterForNewbie, setFilterForNewbie] = useState({
    name: null,
    role: null,
  });
  return (
    <>
      <SearchWrapper setFilter={setFilterForNewbie} />
      <DropDownWrapper list={roleTypes} setFilter={setFilterForNewbie} />
      <SerachButton filter={filterForNewbie} setFilter={setFilter} />
    </>
  );
};

const AdminWrapper = () => {
  const [filter, setFilter] = useState({
    name: null,
    role: null,
    companyId: null,
    ctrClass: null,
    detailCtrClass: null,
  });

  return (
    <AdminContainer>
      <Tabs items={adminItem.COMPANY} />
      <FilterContainer>
        <FilterForNewbie filter={filter} setFilter={setFilter} />
      </FilterContainer>
      <OutletWrapper children={<Outlet context={[filter]} />} />
    </AdminContainer>
  );
};

export default AdminWrapper;
