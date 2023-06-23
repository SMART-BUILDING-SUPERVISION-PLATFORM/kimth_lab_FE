import styled from "@emotion/styled";
import Tabs from "../../components/common/tab";
import { Outlet } from "react-router-dom";
import OutletWrapper from "../../components/admin/common/outletContainer";
import adminItem from "../../components/admin/common/adminItem";

const AdminCaContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 50px 0 50px;
`;

const AdminCa = () => {
  return (
    <AdminCaContainer>
      <Tabs items={adminItem.COMPANY} />
      <OutletWrapper children={<Outlet />} />
    </AdminCaContainer>
  );
};

export default AdminCa;
