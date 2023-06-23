import styled from "@emotion/styled";

const OutletContainer = styled.div`
  width: 100%;
  min-height: calc(100% - 120px);
  overflow: scroll;
`;

const OutletWrapper = ({ children }) => {
  return <OutletContainer>{children}</OutletContainer>;
};

export default OutletWrapper;
