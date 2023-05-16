import styled from "@emotion/styled";
import ctrTypeList from "../../../types/parameters";
import { useState } from "react";

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 20px;
`;

//
//
//

const Filter = () => {
  const [filter, setFilter] = useState({
    companyId: "",
    name: "",
    ctrClass: "",
    detailCtrClass: "",
    onlyMine: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: newValue,
    }));
  };

  const handleCtrClassChange = (e) => {
    const { name, value, checked } = e.target;

    setFilter((prevFilter) => {
      let ctrClass = prevFilter.ctrClass;

      if (checked) {
        ctrClass = [...ctrClass, value];
      } else {
        ctrClass = ctrClass.filter((item) => item !== value);
      }

      return {
        ...prevFilter,
        [name]: ctrClass,
      };
    });
  };

  const handleDetailCtrClassChange = (e) => {
    const { name, value, checked } = e.target;

    setFilter((prevFilter) => {
      let detailCtrClass = prevFilter.detailCtrClass;

      if (checked) {
        detailCtrClass = [...detailCtrClass, value];
      } else {
        detailCtrClass = detailCtrClass.filter((item) => item !== value);
      }

      return {
        ...prevFilter,
        [name]: detailCtrClass,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onFilterChange(filter);
  };

  return (
    // <ModalContainer>
    //     <div>
    //       <form onSubmit={handleSubmit}>
    //         {/* ... */}
    //         {ctrTypeList.map(({ label, className, option }) => (
    //           <div key={label} className={className}>
    //             <label>{label}</label>
    //             {option.map(({ value, label }) => (
    //               <label key={value}>
    //                 <input
    //                   type="checkbox"
    //                   name={className}
    //                   value={value}
    //                   checked={filter[className] === value}
    //                   onChange={
    //                     className === "ctrType"
    //                       ? handleCtrClassChange
    //                       : handleDetailCtrClassChange
    //                   }
    //                 />
    //                 {label}
    //               </label>
    //             ))}
    //           </div>
    //         ))}
    //         {/* ... */}
    //         <button type="submit">Apply Filter</button>
    //       </form>
    //     </div>
    // </ModalContainer>
    <div>modal test</div>
  );
};

export default Filter;
