import { AlertOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const NavContainer = styled.ul`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Item = styled.li`
  width: 49.5%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  border-bottom: 2px solid
    ${({ isValid }) => (isValid ? "white" : "rgba(255, 255, 255, 0.5)")};
  color: ${({ isValid }) => (isValid ? "white" : "rgba(255, 255, 255, 0.5)")};
  transition: all 0.15s ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  cursor: pointer;
`;
const navItems = [
  {
    id: 1,
    name: "caution",
    children: <AlertOutlined />,
  },
  {
    id: 2,
    name: "support",
    children: <QuestionCircleOutlined />,
  },
];

const NavForNotes = ({ noteType, setNoteType }) => {
  return (
    <NavContainer>
      {navItems.map(({ id, name, children }) => (
        <Item
          key={id}
          className="item"
          onClick={() => setNoteType(name)}
          isValid={noteType === name}
        >
          {children}
        </Item>
      ))}
    </NavContainer>
  );
};

export default NavForNotes;
