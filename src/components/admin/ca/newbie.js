import { useEffect, useState } from "react";
import useApi from "../../hooks/api/axiosInterceptor";
import NewbieTableForCa from "./table";

const Newbie = () => {
  const [crewData, setCrewData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await useApi.get("/api/crew/admin-ca", {
        params: {
          isPending: true,
        },
      });

      const newData = data.map((crew) => {
        const {
          name,
          email,
          phone,
          role: { attr },
        } = crew;
        return {
          name,
          email,
          phone,
          attr,
        };
      });

      setCrewData(newData);
    })();
  }, []);
  return <NewbieTableForCa crewData={crewData} />;
};

export default Newbie;
