import React, { useEffect, useRef, useState } from "react";
import useHover from "../../hooks/useHover";
import EditableText from "../EditableText/EditableText";
import ListHeaderItem from "../ListHeaderItem/ListHeaderItem";
import ListItem from "../ListItem/ListItem";
import MyButton from "../UI/MyButton/MyButton";

/////styles
import styles from "./List.module.scss";
const fakeData = [
  { isChecked: false, item: "XXXX-", id: 1, company: "Kyivstar",title: "Blue" },
  { isChecked: false, item: "XXXX-", id: 2, company: "Kyivstar",title: "Space greyffffffffffffff" },
  { isChecked: false, item: "XXXX-", id: 3, company: "Kyivstar",title: "41 size" },
  { isChecked: false, item: "XXXX-", id: 4, company: "Kyivstar",title: "32 gb" }
];

const List = () => {
  const [data, setData] = useState(fakeData);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchValue, setSearchValue] = useState([""]);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef();
  const isHovered = useHover(tableRef);
  console.table(data)
  const theadFields = [
    { name: "" },
    { name: "Статус", options: [] },
    { name: "Товар", options: [] },
    { name: "ID", options: [] },
    {
      name: "Название",
      options: [
        { name: "Все", value: "" },
        ...data.map((item) => {
          return { name: item.title, value: item.title };
        })
      ]
    }
  ];

  const handleDelete = (id, isFrozen) => {
    if (!isFrozen) {
      setData((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert("Вы не можете удалить объект, поскольку он заморожен");
      return false;
    }
  };



  const handleChange = (obj, fieldName, newText) => {
    const foundItem = data.find((item) => item.id === obj.id);
    foundItem[fieldName] = newText;
  };
  const handleCheckboxChange = (event, item) => {
    item.isChecked = event.target.checked;
    if (event.target.checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    }
  };

  const handleDeleteSelectedItems = (items) => {
    const isFrozen = items.some((item) => item.isFrozen === true);
    if (isFrozen) {
      alert(
        "Невозможно выполнить действие, один или более элементов заморожены"
      );
      return false;
    } else {
      setData((prev) => prev.filter((item) => item.isChecked === false));
      setSelectedItems([]);
    }
  };

  const handleAddItem = () => {
    setData((prev) => [
      ...prev,
      {
        isChecked: false,
        item: "XXXX-",
        id: data.length + 1,
        title: "",
        isNew: true
      }
    ]);
  };

  const handleSearchInput = (queries) => {
    setSearchValue(
      queries.reduce((acc, query) => {
        acc.push(query.value);
        return acc;
      }, [])
    );


  data.map((item) => console.log(searchValue.includes(item.title)))

  };
  return (
    <div className="table_wrapper">
      <table
        cellSpacing={0}
        ref={tableRef}
        className={`${styles.table} ${isHovered ? "" : styles.tableHovered}`}
      >
        <thead>
          <tr>
            {theadFields.map((field) => (
              <ListHeaderItem
                handleSearchInput={handleSearchInput}
                setSelectedItems={setSelectedItems}
                field={field}
                key={field.name}
                name={field.name}
                options={field?.options}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data
              // .filter((item) =>
              // searchValue?.toLowerCase()?.includes(item?.title?.toLowerCase())
              // )
              .map((item) => (
                <ListItem
                  selectedRow={selectedRow}
                  setSelectedRow={setSelectedRow}
                  searchValue={searchValue}
                  handleCheckboxChange={handleCheckboxChange}
                  handleChange={handleChange}
                  oneItem={item}
                  key={item.id}
                  handleDelete={handleDelete}
                  isHovered={isHovered}
                  {...item}
                />
              ))
          ) : (
            <tr>
              <td colSpan={"100%"}>
                <h1>List is empty</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.buttons}>
        <MyButton onClick={handleAddItem}>+</MyButton>
        {selectedItems?.length > 0 && (
          <MyButton onClick={() => handleDeleteSelectedItems(selectedItems)}>
            X
          </MyButton>
        )}
      </div>
    </div>
  );
};

export default List;
