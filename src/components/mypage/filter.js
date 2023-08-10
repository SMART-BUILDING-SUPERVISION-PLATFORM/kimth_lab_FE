import styled from "@emotion/styled";
import FilterForProject from "../common/project/projectList/header/filter";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ContainerForAll = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
`;

const Nav = styled.ul`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 10px;
  cursor: pointer;
  color: ${({ isValid }) => (isValid ? "black" : "rgba(0, 0, 0, 0.6)")};
`;

const FilterContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterWrapper = ({ filter, setFilter, crewId, userInfo }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    role: { attr },
  } = userInfo;

  useEffect(() => {
    const path = pathname.split("/")[2];
    if (path === "project-pending") {
      setFilter({ ...filter, isPending: true });
    } else {
      setFilter({ ...filter, isPending: false });
    }
  }, [pathname]);
  return (
    <ContainerForAll>
      <Nav className="nav">
        <Item
          className="item"
          onClick={() => navigate(`/${crewId}/project-participanting`)}
          isValid={pathname.split("/")[2] === "project-participanting"}
        >
          참여중인 프로젝트
        </Item>
        {attr !== "SERVICE_ADMIN" && (
          <Item
            className="item"
            onClick={() => navigate(`/${crewId}/project-pending`)}
            isValid={pathname.split("/")[2] === "project-pending"}
          >
            대기중인 프로젝트
          </Item>
        )}
      </Nav>
      <FilterContainer>
        <FilterForProject filter={filter} setFilter={setFilter} />
      </FilterContainer>
    </ContainerForAll>
  );
};

export default FilterWrapper;
