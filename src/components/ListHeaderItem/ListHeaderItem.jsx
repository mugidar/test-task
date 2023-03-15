import React, { useEffect } from "react";
import MySelect from "../UI/MySelect/MySelect";
import styles from "./ListHeaderItem.module.scss";
const ListHeaderItem = ({
  name,
  options,
  handleSearchInput,isHovered
}) => {
  return (
    
      <th>
        {name}
        <div>
          {options && (
            <>
              <MySelect
              isHovered={isHovered}
                onChange={handleSearchInput}
                options={options}
                isMulti={true}
              />
            </>
          )}
        </div>
      </th>
  );
};

export default ListHeaderItem;
