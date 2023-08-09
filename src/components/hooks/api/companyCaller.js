import useApi from "./axiosInterceptor";

const companyList = {
  label: "회사",
  className: "companyId",
  option: null,
};

const companyListCaller = async () => {
  const { data } = await useApi.get(`/api/company`);
  const companyListOption = data.map((company) => {
    return {
      label: company.name,
      value: company.id,
    };
  });

  companyList.option = companyListOption;

  return companyList;
};

export default companyListCaller;
