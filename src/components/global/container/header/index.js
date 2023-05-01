import styled from "@emotion/styled";

const HeaderContainer = styled.header`
  background-color: black;
  /* position: absolute; */
  /* width: 100vw; */
  display: block;
  height: 50px;
  justify-content: left;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
`;
const Title = styled.h1`
  color: #fff;
  margin-left: 10px;
  line-height: 50px; /* Title 요소의 높이를 부모인 HeaderContainer의 높이와 동일하게 설정 */
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Digital Construction Supervison Platform</Title>
    </HeaderContainer>
  );
};

export default Header;
