
import styles from "./MyModal.module.scss";

const MyModal = ({ children, visible, setVisible }) => {
  const rootClasses = [styles.myModal];
  if (visible) {
    rootClasses.push(styles.active);
  }
  const handleClick = (e) => {
    e.stopPropagation();
    setVisible(false);
  };
  


  return (
    <div onClick={handleClick} className={rootClasses.join(" ")}>
      {children}
    </div>
  );
};

export default MyModal;
