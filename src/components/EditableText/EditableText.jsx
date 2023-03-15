import { useState } from "react";
import React from "react";

function EditableText({
  text = "",
  isNew,
  placeholder = "Введите информацию",
  name,
  oneItem,
  handleChange,
  isFrozen,
  type
}) {
  const [isEditing, setIsEditing] = useState(isNew);
  const [displayText, setDisplayText] = useState(text);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = ({ target }) => {
    const { value, name } = target;
    if (type === "id" && value.length > 3) {
      alert("ID не может быть больше 3 символов");
      return false;
    } else {
      setDisplayText(value);
      handleChange(oneItem, name, value);
    }
  };
  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <span>
      {isEditing && !isFrozen ? (
        <input
          name={name}
          type="text"
          value={displayText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={handleKeyPressed}
          placeholder={`Введите ${placeholder}`}
        />
      ) : (
        <span onClick={handleTextClick}>{displayText}</span>
      )}
    </span>
  );
}

export default EditableText;
