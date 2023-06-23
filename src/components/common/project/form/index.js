import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Button, Input, Select } from "antd";
import useApi from "../../../hooks/api/axiosInterceptor";
import { ctrTypeList } from "../../../../types/parameters";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";

const { Option } = Select;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProjectContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 4px;
  width: 50%;
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
  width: 700px;
  width: 700px;
  margin-bottom: 20px;
`;

const Label = styled.div`
  width: 170px;
  margin-right: 20px;
  font-size: 15px;
  text-align: right;
`;

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 700px;
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

const ProjectInfoForm = (companyId) => {
  const [form, setForm] = useState({
    companyId: 0,
    name: "",
    startDate: "",
    endDate: "",
    ctrType: "",
    detailCtrType: "",
    thumbnailUrl: "",
    floorPlanUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSelectChange = (e, name) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: e,
    }));
  };

  const handleDateChange = (name, date) => {
    const day = date.$D < 10 ? `0${date.$D}` : date.$D;
    const month = date.$M + 1 < 10 ? `0${date.$M + 1}` : date.$M + 1;
    const dateString = `${date.$y}-${month}-${day}`;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: dateString,
    }));
  };

  const handleImageUpload = () => {
    setForm((prevForm) => ({
      ...prevForm,
      thumbnailPreview: true,
    }));
  };

  const handleFileUpload = () => {};

  const handleSubmit = async () => {
    console.log(form);
    try {
      await useApi.post("/api/project", form);
      alert("프로젝트가 생성되었습니다.");
      window.location.href = "/";
      // onClose();
    } catch (err) {
      const { code } = err.response.data;
      console.log(code);
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

  const navigate = useNavigate();

  return (
    <ProjectContainer>
      {/* TODO: 프로젝트 수정 */}
      {/* TODO: Service Admin - company 선택 기능 */}
      <Title></Title>
      <ProjectContent>
        {/* TODO: 각 입력창들의 rules 지정 ? */}
        <InputWrapper>
          <Label>
            <span>프로젝트 명</span>
          </Label>
          <Input
            name="name"
            value={form.name}
            className="input"
            onChange={(e) => handleInputChange(e)}
          />
        </InputWrapper>

        <InputWrapper style={{ textAlign: "center" }}>
          <Label>프로젝트 기간</Label>
          <DatePicker
            name="startDate"
            placeholder="시작일을 선택해주세요."
            style={{ width: "300px" }}
            onChange={(date) => {
              handleDateChange("startDate", date);
            }}
          />
          <div style={{ width: "80px" }}>~</div>
          <DatePicker
            name="endDate"
            placeholder="종료일을 선택해주세요."
            style={{ width: "300px" }}
            onChange={(date) => {
              handleDateChange("endDate", date);
            }}
          />
        </InputWrapper>

        <InputWrapper>
          <Label>
            <span>공사구분</span>
          </Label>
          {ctrTypeList.slice(0, 1).map(({ className, option }) => (
            <Select
              key={className}
              className={className}
              value={form.ctrType}
              style={{ width: "700px" }}
              name="ctrType"
              onChange={(e) => {
                handleSelectChange(e, "ctrType");
              }}
              placeholder="공사구분을 선택해주세요."
            >
              {option.map(({ label, value }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          ))}
        </InputWrapper>

        <InputWrapper>
          <Label>
            <span>세부 공사구분</span>
          </Label>
          {ctrTypeList.slice(1, 2).map(({ className, option }) => (
            <Select
              key={className}
              className={className}
              value={form.detailCtrType}
              style={{ width: "700px" }}
              name="detailCtrType"
              onChange={(e) => {
                handleSelectChange(e, "detailCtrType");
              }}
            >
              {option.map(({ label, value }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          ))}
        </InputWrapper>

        <InputWrapper>
          <Label>
            <span>대표 이미지(썸네일)</span>
          </Label>
          <UploadWrapper>
            <Input
              name="thumbnail"
              valuePropName="fileList"
              type="file"
              // getValueFromEvent={(e) => e && e.fileList}
            />
            <UploadImage
              name="thumbnail"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleImageUpload}
            ></UploadImage>
          </UploadWrapper>
        </InputWrapper>
        {/* TODO: check */}
        {/* {thumbnailPreview && <ImagePreview src="thumbnail" />} */}

        <InputWrapper>
          <Label>
            <span>층별 평면도</span>
          </Label>
          <UploadWrapper>
            <Input
              name="floorplan"
              valuePropName="fileList"
              type="file"
              // getValueFromEvent={(e) => e && e.fileList}
            />
            {/* TODO: 폴더 선택? */}
            {/* <Button>파일 선택</Button> */}
          </UploadWrapper>
        </InputWrapper>

        <Footer>
          <Button key="cancel" onClick={() => navigate("/")} className="btn">
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
