import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Button, Input, DatePicker, Select } from "antd";
import useApi from "../../../components/hooks/api/axiosInterceptor";

const { Option } = Select;

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
  max-width: 1000px;
  .input {
  }
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

  const ctrTypeList = [
    {
      label: "공사구분",
      className: "ctrType",
      value: form.ctrType,
      option: [
        { label: "건축공사", value: "건축공사" },
        { label: "토목공사", value: "토목공사" },
        { label: "플랜트공사", value: "플랜트공사" },
        { label: "조경공사", value: "조경공사" },
      ],
    },
    {
      label: "세부 공사구분",
      className: "detailCtrType",
      value: form.detailCtrType,
      option: [
        { label: "주거용 건축물", value: "주거용 건축물" },
        { label: "사무실용 건축물", value: "사무실용 건축물" },
        { label: "상업용 건축물", value: "상업용 건축물" },
        { label: "공업용 건축물", value: "공업용 건축물" },
        { label: "병원", value: "병원" },
        { label: "학교", value: "학교" },
        { label: "기타", value: "기타" },
      ],
    },
  ];

  const handleImageUpload = () => {
    setThumbnailPreview(true);
  };

  const handleFileUpload = () => {};

  const handleSubmit = async () => {
    try {
      await useApi.post("/api/project", form);

      alert("프로젝트가 생성되었습니다.");
      onClose();
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

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <>
      <ModalContainer
        visible={visible}
        onCancel={onClose}
        title="프로젝트 추가"
      >
        <ModalContent>
          {/* TODO: 각 입력창들의 rules 지정 ? */}
          <label for="프로젝트 명" />
          <Input
            name="name"
            value={name}
            className="input"
            onChange={(e) => setName(e.target.value)}
          />

          <label for="프로젝트 기간" />
          <Input name="period" />
          {/* value={[startDate, endDate]}
              onChange={(date, dateString) => {
                setStartDate(date[0]);
                setEndDate(date[1]);
              }} */}

          {ctrTypeList.map(({ label, className, value, option }) => (
            <Select
              key={className}
              placeholder={label}
              className={className}
              value={value}
              onChange={(e) => {
                setForm({
                  ...form,
                  [className]: e,
                });
              }}
            >
              {/* <label for={label}></label> */}
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
            <Button key="cancel" onClick={onClose} className="btn">
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
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default ProjectInfoForm;
