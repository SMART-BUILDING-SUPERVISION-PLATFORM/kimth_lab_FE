const ctrTypeList = [
  {
    label: "공사구분",
    className: "ctrType",
    // value: form.ctrType,
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
    // value: form.detailCtrType,
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

export default ctrTypeList;
