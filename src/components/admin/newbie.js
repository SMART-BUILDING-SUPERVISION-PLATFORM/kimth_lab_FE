import { useEffect, useState } from "react";
import useApi from "../hooks/api/axiosInterceptor";
import NewbieTable from "./common/table";
import { useOutletContext } from "react-router-dom";
import { roleParser, reverseRoleParser } from "../../types/parameters";

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

const Newbie = () => {
  const [crewData, setCrewData] = useState([]);
  const {
    filter,
    userInfo: {
      role: { attr: userRole },
      company: { id: userCompanyId },
    },
  } = useOutletContext();
  const { name, role } = filter;

  const req = {
    name,
    role: roleParser(role),
    isPending: true,
    companyId: filter.companyId,
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await useApi.get(
          `/api/crew/admin-${
            userRole === "COMPANY_ADMIN"
              ? "ca"
              : userRole === "SERVICE_ADMIN"
              ? "all"
              : null
          }`,
          {
            params: req,
          }
        );

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
      } catch (error) {}
    })();
  }, [filter, userRole]);
  return (
    <NewbieTable
      crewData={crewData}
      currentCompanyId={userCompanyId}
      userRole={userRole}
    />
  );
};

export default Newbie;
