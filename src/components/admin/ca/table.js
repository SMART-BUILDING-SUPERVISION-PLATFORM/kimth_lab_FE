import styled from "@emotion/styled";
import useApi from "../../hooks/api/axiosInterceptor";

const ItemContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  margin-bottom: 5px;
`;
const ElementContainer = styled.div`
  width: 100%;
  display: flex;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  justify-content: space-between;
`;

const Element = styled.div`
  min-width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  &:first-of-type {
    justify-content: flex-start;
    padding-left: 10px;
  }
  align-items: center;
  .txt {
    font-size: 15px;
    color: black;
    text-align: end;
  }
`;

const ToggleButton = styled.button`
  width: 100px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  border: none;
`;

const Item = ({ crew }) => {
  const serializedCrew = Object.values(crew);
  // const allowCrew = async () => {
  //   try {
  //     await useApi.put(`/api/crew/admin-ca/${id}`);
  //   } catch (err) {}
  // };
  return (
    <ElementContainer>
      {serializedCrew.map((values) => (
        <Element key={values}>
          <span className="txt">{values}</span>
        </Element>
      ))}
      <ToggleButton>승인</ToggleButton>
    </ElementContainer>
  );
};

const NewbieTableForCa = ({ crewData }) => {
  return (
    <>
      {crewData.map((crew) => (
        <ItemContainer key={crew.email}>
          <Item crew={crew} />
        </ItemContainer>
      ))}
    </>
  );
};

export default NewbieTableForCa;
