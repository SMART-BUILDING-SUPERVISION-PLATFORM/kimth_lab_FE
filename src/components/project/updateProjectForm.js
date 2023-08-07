import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "antd";
import useApi from "../hooks/api/axiosInterceptor";
import { ctrTypeList } from "../../types/parameters";

const { Option } = Select;

const ProjectContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
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

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
  .btn {
    margin-right: 12px;
  }
`;

const pickARandomThumbnail = () => {
  const projectThumnailList = [
    "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVpbGRpbmd8ZW58MHx8MHx8&w=1000&q=80",
    "https://en.seoultech.ac.kr/storage/splash/SNUST1AFD6F09CE4647CAB9B66C50255213BC.png",
    "https://uni24k.com/media/CACHE/images/unis/pic_school_14163_building_bf4edbb7/7459d22960f7b059ad4427e304e5e343.jpg",
    "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg",
    "https://koreajoongangdaily.joins.com/data/photo/2023/03/04/6370fba3-314e-4201-aff3-f9ae9655f40c.jpg",
  ];
  const randomIndex = Math.floor(Math.random() * projectThumnailList.length);
  return projectThumnailList[randomIndex];
};

const UpdateProjectForm = (companyId) => {
  const navigate = useNavigate();
  const { projectId } = useParams();

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

  const handleSubmit = async () => {
    try {
      await useApi.put(`/api/project/${projectId}`, form);
      alert("프로젝트가 수정되었습니다.");
      navigate(`/${projectId}/view`);
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
    (async () => {
      try {
        const { data } = await useApi.get(`/api/project/${projectId}`);
        const {
          company: { id },
          name,
          startDate,
          endDate,
          ctrType: { value: ctrType },
          detailCtrType: { value: detailCtrType },
          thumbnailUrl,
          floorPlanUrl,
        } = data;

        setForm((prevForm) => ({
          ...prevForm,
          companyId: id,
          name,
          startDate,
          endDate,
          ctrType,
          detailCtrType,
          thumbnailUrl,
          floorPlanUrl: floorPlanUrl ? floorPlanUrl : "",
        }));
      } catch (err) {
        alert("접근권한이 없습니다.");
        navigate(`/${projectId}/view`);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <ProjectContainer>
      <ProjectContent>
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
              console.log(date);
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

export default UpdateProjectForm;
