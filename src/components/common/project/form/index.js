import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Button, Input, Select } from "antd";
import useApi from "../../../hooks/api/axiosInterceptor";
import ctrTypeList from "../../../../types/parameters";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const ProjectContainer = styled.div`
  /* width: 100%;
  height: 100%; */
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* z-index: 9999; */
`;

const ProjectContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 4px;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
  width: 50%;
  /* max-width: 1000px; */
  .input {
  }
`;

const Title = styled.h3`
  margin-top: 100px;
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.div`
  width: 100px;
  margin-right: 20px;
`;

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UploadImage = styled.div``;

const ImagePreview = styled.img``;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
  .btn {
    margin-right: 12px;
  }
`;

const ProjectInfoForm = ({ companyId, visible, onClose }) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ctrType, setCtrType] = useState("");
  const [detailCtrType, setDetailCtrType] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [floorPlanUrl, setFloorPlanUrl] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [form, setForm] = useState({
    companyId: 0,
    name: "",
    startDate: "",
    endDate: "",
    ctrType: "",
    detailCtrType: "",
    thumbnailUrl: "",
    floorPlanUrl: "",
    // companyId,
    // name,
    // startDate: startDate.format("YYYY-MM-DD"),
    // endDate: endDate.format("YYYY-MM-DD"),
    // ctrType,
    // detailCtrType,
    // thumbnailUrl,
    // floorPlanUrl,
  });

  const handleImageUpload = () => {
    setThumbnailPreview(true);
  };

  const handleFileUpload = () => {};

  const handleSubmit = async () => {
    try {
      await useApi.post("/api/project", form);
      alert("프로젝트가 생성되었습니다.");
      // onClose();
    } catch (err) {
      const { code } = err.response.data;
      if (code === -412) {
        // 프로젝트 생성 권한이 없음
        alert("프로젝트 생성 권한이 없습니다.");
      } else if (code === -421) {
        // 회사가 존재하지 않음
        alert("회사가 존재하지 않습니다.");
      } else if (code === -423) {
        // 회원이 존재하지 않음
        alert("회원이 존재하지 않습니다.");
      } else if (code === -424) {
        // 세션이 종료됨
        alert("세션이 종료되었습니다. 다시 시도해주세요.");
      }
    }
  };

  useEffect(() => {}, [form]);
  const navigate = useNavigate();

  return (
    <ProjectContainer>
      {/* TODO: 프로젝트 수정 */}
      <Title>프로젝트 생성</Title>
      <ProjectContent>
        {/* TODO: 각 입력창들의 rules 지정 ? */}
        <InputWrapper>
          <Label>프로젝트 명</Label>
          <Input
            name="name"
            value={name}
            className="input"
            onChange={(e) => setName(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>프로젝트 기간</Label>
          <Input name="period" />
        </InputWrapper>

        {ctrTypeList.map(({ label, className, option }) => (
          <Select
            key={className}
            placeholder={label}
            className={className}
            value={form[className]}
            onChange={(e) => {
              setForm({
                ...form,
                [className]: e,
              });
            }}
          >
            {option.map(({ label, value }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        ))}

        <label for="대표 이미지(썸네일)" />
        <UploadWrapper>
          <Input
            name="thumbnail"
            valuePropName="fileList"
            type="file"
            // getValueFromEvent={(e) => e && e.fileList}
          />
          <UploadImage
            name="thumbnail"
            // listType="picture-card"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleImageUpload}
          >
            {thumbnailPreview && {}}
          </UploadImage>
        </UploadWrapper>

        <label for="층별 평면도" />
        <UploadWrapper>
          <Input
            name="floorPlan"
            beforeUpload={() => false}
            // onChange={handleFileUpload}
          />
          {/* TODO: 폴더 선택? */}
          <Button>파일 선택</Button>
        </UploadWrapper>

        <Footer>
          <Button key="cancel" onClick={navigate("/")} className="btn">
            취소
          </Button>
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit}
            style={{ backgroundColor: "1777ff" }}
            // loading={loading}
          >
            등록
          </Button>
        </Footer>
      </ProjectContent>
    </ProjectContainer>
  );
};

export default ProjectInfoForm;
