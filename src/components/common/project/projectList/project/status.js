import { LockOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import useApi from "../../../../hooks/api/axiosInterceptor";

const StatusContainer = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
  .label {
    height: 20px;
    margin-left: 6px;
    margin-top: 20px;
    font-size: 13px;
    font-weight: bold;
  }
`;

const StatusBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 6px 6px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  height: 50px;
  border-bottom: 2px solid ${({ color }) => color};
  .value {
    font-size: 17px;
    text-align: center;
    font-weight: bold;
    color: ${({ color }) => color};
  }
`;

const LoadingCircle = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: ${({ color }) => color};
`;

const Status = ({ projectId, label, value, color, userRole, pathname }) => {
  const [numberOfValue, setNumberOfValue] = useState(null);
  useEffect(() => {
    if (pathname.includes("home")) {
      if (userRole === "SERVICE_ADMIN" || userRole === "COMPANY_ADMIN") {
        if (label === "caution" || label === "support") {
          (async () => {
            const { data } = await useApi.get(`/api/note/admin/${projectId}`, {
              params: {
                type: label,
                new: false,
              },
            });

            setNumberOfValue(data.length);
          })();
        } else if (label === "new") {
          (async () => {
            const { data } = await useApi.get(`/api/note/admin/${projectId}`, {
              params: {
                type: label,
                new: true,
              },
            });

            setNumberOfValue(data.length);
          })();
        } else {
          setNumberOfValue(value);
        }
      }
    } else if (pathname.includes("project-participanting")) {
      if (label === "caution" || label === "support") {
        if (userRole === "SERVICE_ADMIN" || userRole === "COMPANY_ADMIN") {
          (async () => {
            const { data } = await useApi.get(`/api/note/admin/${projectId}`, {
              params: {
                type: label,
                new: false,
              },
            });

            setNumberOfValue(data.length);
          })();
        } else {
          (async () => {
            const { data } = await useApi.get(`/api/note/user/${projectId}`, {
              params: {
                type: label,
                new: false,
              },
            });

            setNumberOfValue(data.length);
          })();
        }
      } else if (label === "new") {
        (async () => {
          const { data } = await useApi.get(`/api/note/user/${projectId}`, {
            params: {
              type: label,
              new: true,
            },
          });

          setNumberOfValue(data.length);
        })();
      } else {
        setNumberOfValue(value);
      }
    }
  }, [pathname, projectId, label, userRole, value]);
  return (
    <StatusContainer>
      <div className="label">{label}</div>
      <div style={{ height: "20px" }}></div>
      <StatusBox color={color}>
        {numberOfValue === null ? (
          <LoadingCircle color={color}>
            <LockOutlined color={color} />
          </LoadingCircle>
        ) : (
          <span className="value">
            {numberOfValue}
            {label === "공정률" && "%"}
          </span>
        )}
      </StatusBox>
    </StatusContainer>
  );
};

export default Status;
