import styled from "@emotion/styled";
import Tabs from "../../components/common/tab";

const AdminCaContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 50px;
`;

const items = [
  {
    name: "신규회원 관리",
    to: "/admin-ca/new-crew",
  },
  {
    name: "회원 관리",
    to: "/admin-ca/crew",
  },
  {
    name: "separator",
    to: null,
  },
  {
    name: "프로젝트 관리",
    to: "/admin-ca/project",
  },
  {
    name: "프로젝트 참여요청",
    to: "/admin-ca/project-request",
  },
];

const AdminCa = () => {
  return (
    <AdminCaContainer>
      <Tabs items={items} />
    </AdminCaContainer>
  );
};

export default AdminCa;
