import { useEffect, useState } from "react";
import useApi from "../../hooks/api/axiosInterceptor";
import NewbieTableForCa from "./table";
import { useOutletContext } from "react-router-dom";
import { roleParser, reverseRoleParser } from "../../../types/parameters";

const Newbie = () => {
  const [crewData, setCrewData] = useState([]);
  const [filter] = useOutletContext();
  const { name, role } = filter;
  const req = {
    name,
    role: roleParser(role),
    isPending: true,
  };

  useEffect(() => {
    console.log(req);
    (async () => {
      const { data } = await useApi.get("/api/crew/admin-ca", {
        params: req,
      });

      const newData = data.map((crew) => {
        const {
          id,
          name,
          email,
          phone,
          role: { attr },
        } = crew;
        return {
          id,
          name,
          email,
          phone,
          role: reverseRoleParser(attr),
        };
      });

      setCrewData(newData);
    })();
  }, [filter]);
  return <NewbieTableForCa crewData={crewData} />;
};

export default Newbie;
