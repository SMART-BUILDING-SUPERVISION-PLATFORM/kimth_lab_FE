import { useEffect, useState } from "react";
import useApi from "../hooks/api/axiosInterceptor";
import { reverseRoleParser, roleParser } from "../../types/parameters";
import { useOutletContext } from "react-router-dom";
import ManageTable from "./common/table";

const index = [
  {
    id: 0,
    name: "이름",
    company: "회사",
    email: "이메일",
    phone: "전화번호",
    attr: "업종",
  },
];

const Manage = () => {
  const [crewData, setCrewData] = useState([]);
  const {
    filter,
    userInfo: {
      role: { attr: userRole },
      company: { id: userCompanyId },
    },
  } = useOutletContext();

  useEffect(() => {
    (async () => {
      const req = {
        name: filter.name,
        role: roleParser(filter.role),
        isPending: false,
        companyId: filter.companyId,
      };
      const { data } = await useApi.get(`/api/crew/admin-all`, {
        params: req,
      });

      if (data.length === 0) {
        window.alert("검색 결과가 없습니다.");
        window.location.reload();
        return;
      }

      const newData = data.map((crew) => {
        const {
          id,
          name,
          email,
          phone,
          role: { attr },
          company: { id: companyId, name: companyName },
        } = crew;

        return {
          id,
          name,
          companyName,
          email,
          phone,
          role: reverseRoleParser(attr),
          companyId,
        };
      });

      setCrewData(index.concat(newData));
    })();
  }, [filter, userRole]);
  return (
    <ManageTable
      crewData={crewData}
      currentCompanyId={userCompanyId}
      userRole={userRole}
    />
  );
};

export default Manage;
