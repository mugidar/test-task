import React, { useEffect } from "react";
import MySelect from "../UI/MySelect/MySelect";
import styles from "./ListHeaderItem.module.scss";
const ListHeaderItem = ({
  name,
  options,
  handleSearchInput
}) => {
  return (
    <>
      <th>
        {name}
        <div>
          {options && (
            <>
              <MySelect
                onChange={handleSearchInput}
                options={options}
                isMulti={true}
                placeHolder={"Select..."}
              />
              <select onChange={handleSearchInput}>
                {options.map((option, index) => (
                  <option value={option.value} key={index}>
                    {option?.name}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </th>
    </>
  );
};

export default ListHeaderItem;
