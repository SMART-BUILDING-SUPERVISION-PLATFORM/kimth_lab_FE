import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

const ProfileContainer = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    width: 100%;
    display: flex;
    align-items: baseline;
    margin-bottom: 10px;
    .name {
      font-size: 20px;
      margin-right: 5px;
    }
    .role {
      font-size: 15px;
      color: rgba(0, 0, 0, 0.6);
    }
  }

  .rest {
    display: flex;
    font-weight: bold;
    .txt {
      margin-left: 5px;
    }
    &:last-of-type {
      margin-bottom: 5px;
    }
  }
`;

const ProfileWrapper = ({ userInfo }) => {
  const {
    name,
    email,
    phone,
    company: { name: companyName },
    role: { value: role },
  } = userInfo;
  return (
    <ProfileContainer>
      <div className="top">
        <div className="name">{name}</div>
        <div className="role">{role}</div>
      </div>

      <div className="rest">
        <MailOutlined />
        <div className="txt">{email}</div>
      </div>
      <div className="rest">
        <PhoneOutlined />
        <div className="txt">{phone}</div>
      </div>
      <div className="rest">
        <HomeOutlined />
        <div className="txt">{companyName}</div>
      </div>
    </ProfileContainer>
  );
};

export default ProfileWrapper;
