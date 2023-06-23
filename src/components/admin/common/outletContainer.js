import styled from "@emotion/styled";

const OutletContainer = styled.div`
  width: 100%;
  min-height: calc(100% - 50px);
  /* background-color: rgba(0, 0, 0, 0.2); */
  overflow: scroll;
`;

const OutletWrapper = ({ children }) => {
  return <OutletContainer>{children}</OutletContainer>;
};

export default OutletWrapper;
