import styled from "@emotion/styled";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 450px;

  ul li {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid transparent;
    border-radius: 4px;
    margin-bottom: 10px;

    &:hover {
      border-color: #cccccc;
    }
  }
  p {
    margin-bottom: 10px;
  }
  button {
    cursor: pointer;
    /* background-color: #cccccc; */
    padding: 5px 10px;
    border: none;
    justify-content: center;
    border-radius: 4px;
    font-size: 14px;
    width: 100px;

    &:hover {
      color: white;
      background-color: #97deff;
    }
  }
`;

const Modal = ({ companyList, handleCompanyClick, onClose }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <ul>
          {companyList.map((company) => (
            <li
              key={company.id}
              onClick={() => handleCompanyClick(company.id, company.name)}
            >
              <p style={{ fontWeight: "bolder" }}>{company.name}</p>
              <p style={{ fontSize: "13px" }}>{company.address}</p>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
