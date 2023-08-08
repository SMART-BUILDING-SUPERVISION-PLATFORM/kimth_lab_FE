import styled from "@emotion/styled";
import Tabs from "../components/common/tab";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  DropDownWrapper,
  SearchWrapper,
} from "../components/admin/common/filters";
import { roleTypes } from "../types/parameters";
import OverviewBox from "../components/common/project/overview";
import companyListCaller from "../components/hooks/api/companyCaller";

const FilterWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  .filter {
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }
`;

const AdminContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 50px 0 50px;
`;

const OutletContainer = styled.div`
  width: 100%;
  min-height: calc(100% - 114px);
  padding-bottom: 50px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const FilterContainer = styled.div`
  min-width: 400px;
  display: flex;
`;

export const FilterForNewbie = ({ attr, filter, setFilter, placeholder }) => {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    if (attr === "SERVICE_ADMIN")
      (async () => {
        setCompanyData(await companyListCaller());
      })();
  }, [filter]);
  return (
    <FilterContainer>
      {attr === "SERVICE_ADMIN" && (
        <DropDownWrapper list={companyData} setFilter={setFilter} />
      )}
      <DropDownWrapper list={roleTypes} setFilter={setFilter} />
      <SearchWrapper
        filter={filter}
        setFilter={setFilter}
        placeholder={placeholder}
      />
    </FilterContainer>
  );
};

const FilterForManage = ({ filter, setFilter, placeholder }) => {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    (async () => {
      setCompanyData(await companyListCaller());
    })();
  }, [filter]);
  return (
    <FilterContainer>
      <DropDownWrapper list={companyData} setFilter={setFilter} />
      <DropDownWrapper list={roleTypes} setFilter={setFilter} />
      <SearchWrapper
        filter={filter}
        setFilter={setFilter}
        placeholder={placeholder}
      />
    </FilterContainer>
  );
};

const adminItem = [
  {
    name: "신규회원",
    to: "/admin/pending",
    endPoint: "/api/crew/admin-ca",
  },
  {
    name: "회원관리",
    to: "/admin/manage",
    endPoint: "/api/crew/admin-all",
  },
];

const Admin = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[2];
  const { userInfo } = useOutletContext();
  const {
    role: { attr },
    company: { id: companyId },
  } = userInfo;

  const params = {
    name: null,
    role: null,
    companyId: attr === "COMPANY_ADMIN" ? companyId : null,
    ctrClass: null,
    detailCtrClass: null,
  };

  const [filter, setFilter] = useState({
    name: null,
    role: null,
    companyId: attr === "COMPANY_ADMIN" ? companyId : null,
    ctrClass: null,
    detailCtrClass: null,
  });

  useEffect(() => {
    setFilter(params);
  }, [location, userInfo]);

  return (
    <AdminContainer>
      <OverviewBox />
      <FilterWrapper>
        <Tabs items={adminItem} />
        <div className="filter">
          {pathname === "pending" ? (
            <FilterForNewbie
              attr={attr}
              filter={filter}
              setFilter={setFilter}
              placeholder="이름"
            />
          ) : pathname === "manage" ? (
            <FilterForManage
              filter={filter}
              setFilter={setFilter}
              placeholder="이름"
            />
          ) : null}
        </div>
      </FilterWrapper>
      <OutletContainer>
        <Outlet context={{ filter, userInfo }} />
      </OutletContainer>
    </AdminContainer>
  );
};

export default Admin;
