import React, { useEffect, useRef, useState } from "react";
import useHover from "../../hooks/useHover";
import EditableText from "../EditableText/EditableText";
import MyCheckbox from "../UI/MyCheckbox/MyCheckbox";
import styles from "./ListItem.module.scss";
import kyivstar from "../../assets/icons/kyivstar.png";
import rozetka from "../../assets/icons/rozetka.png";
import modna from "../../assets/icons/modna.png";
import meest from "../../assets/icons/meest.png";
import fua from "../../assets/icons/fua.png";
import ups from "../../assets/icons/ups.png";
import ebay from "../../assets/icons/ebay.png";
import autolux from "../../assets/icons/autolux.png";
import ukraine from "../../assets/icons/ukraine.png";
import delivery from "../../assets/icons/delivery.png";
import MyModal from "../UI/MyModal/MyModal";

const companies = [
  {
    name: "Kyivstar",
    imgSrc: kyivstar
  },
  {
    name: "FUa",
    imgSrc: fua
  },
  {
    name: "Delivery",
    imgSrc: delivery
  },
  {
    name: "Rozetka",
    imgSrc: rozetka
  },
  {
    name: "Meest",
    imgSrc: meest
  },
  {
    name: "Modna kasta",
    imgSrc: modna
  },

  {
    name: "UPS",
    imgSrc: ups
  },
  {
    name: "EBay",
    imgSrc: ebay
  },
  {
    name: "Autolux",
    imgSrc: autolux
  },
  {
    name: "Ukraine",
    imgSrc: ukraine
  }
];

const ListItem = ({
  item,
  id,
  title,
  handleDelete,
  isNew,
  oneItem,
  handleChange,
  handleCheckboxChange,
  selectedRow,
  setSelectedRow
}) => {
  const deletBtnRef = useRef();
  const isHovered = useHover(deletBtnRef);
  const [modal, setModal] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const currentCompany = companies.find(
    (company) => oneItem.company === company.name
  );
  const handleFreezeObject = (obj) => {
    if (!isFrozen) {
      obj.isFrozen = true;
      setIsFrozen(true);
    } else {
      obj.isFrozen = false;
      setIsFrozen(false);
    }
  };

  return (
    <tr
      className={styles.row}
      onClick={() => {
        setSelectedRow(oneItem);
      }}
      style={{
        backgroundColor:
          selectedRow?.id === oneItem?.id ? "rgba(81, 81, 81, 0.7)" : "white"
      }}
    >
      <td
        style={{ backgroundColor: oneItem.isFrozen ? "#4b4b4b" : "" }}
        onClick={(e) => {
          e.stopPropagation();
          handleFreezeObject(oneItem);
        }}
        className={styles.freezeBtn}
      ></td>
      <td>
        <MyCheckbox
          oneItem={oneItem}
          handleCheckboxChange={(event) => handleCheckboxChange(event, oneItem)}
        />
      </td>
      <td className={styles.item}>
        <EditableText
          isFrozen={isFrozen}
          handleChange={handleChange}
          oneItem={oneItem}
          name={"item"}
          isNew={false}
          text={item}
        />
      </td>
      <td className={styles.id}>
        <EditableText
          isFrozen={isFrozen}
          handleChange={handleChange}
          oneItem={oneItem}
          name={"id"}
          type={"id"}
          isNew={isNew}
          text={id}
        />
      </td>
      <td className={styles.title}>
        <MyModal visible={modal} setVisible={setModal}>
          {companies.map((company) => (
            <img
              title={company.name}
              onClick={(e) => {
                currentCompany.name === e.target.name
                  ? alert("Вы уже выбрали эту компанию")
                  : setModal(false);
                oneItem.company = e.target.name;
                
              }}
              name={company.name}
              key={company.name}
              src={company.imgSrc}
              alt={company.name}
            />
          ))}
        </MyModal>
        <img
          src={currentCompany.imgSrc}
          alt={currentCompany.name}
          onClick={(e) => setModal((prev) => (prev = !prev))}
        />
        <EditableText
          isFrozen={isFrozen}
          handleChange={handleChange}
          oneItem={oneItem}
          name={"title"}
          isNew={isNew}
          text={title}
        />
      </td>
      <td>
        <button
          ref={deletBtnRef}
          className={styles.deleteBtn}
          title="Удалить строку"
          onClick={() => {
            handleDelete(id, isFrozen);
          }}
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
