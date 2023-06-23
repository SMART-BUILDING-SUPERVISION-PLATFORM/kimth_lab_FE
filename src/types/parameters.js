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

const roleTypes = {
  label: "업종구분",
  className: "role",
  option: [
    {
      label: "서비스관리자",
      value: "서비스관리자",
    },
    {
      label: "관리자",
      value: "관리자",
    },
    {
      label: "발주처",
      value: "발주처",
    },
    {
      label: "감리사",
      value: "감리사",
    },
    {
      label: "건설사",
      value: "건설사",
    },
    {
      label: "설계사",
      value: "설계사",
    },
  ],
};

const roleParser = (role) => {
  let roleTypes = null;
  switch (role) {
    case "서비스관리자":
      roleTypes = "SERVICE_ADMIN";
      break;
    case "관리자":
      roleTypes = "COMPANY_ADMIN";
      break;
    case "발주처":
      roleTypes = "ORDER";
      break;
    case "감리사":
      roleTypes = "SUPERVISOR";
      break;
    case "건설사":
      roleTypes = "CONSTRUCTION";
      break;
    case "설계사":
      roleTypes = "DESIGN";
      break;
    default:
      roleTypes = null;
      break;
  }

  return roleTypes;
};

const reverseRoleParser = (role) => {
  let roleTypes = null;
  switch (role) {
    case "SERVICE_ADMIN":
      roleTypes = "서비스관리자";
      break;
    case "COMPANY_ADMIN":
      roleTypes = "관리자";
      break;
    case "ORDER":
      roleTypes = "발주처";
      break;
    case "SUPERVISOR":
      roleTypes = "감리사";
      break;
    case "CONSTRUCTION":
      roleTypes = "건설사";
      break;
    case "DESIGN":
      roleTypes = "설계사";
      break;
    default:
      roleTypes = null;
      break;
  }

  return roleTypes;
};

export { ctrTypeList, roleTypes, roleParser, reverseRoleParser };
