import styles from "./MyModal.module.scss";

const MyModal = ({ children, visible, setVisible }) => {
  const rootClasses = [styles.myModal];
  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div
      onClick={(e) => {
        setVisible(false);
        e.stopPropagation();
      }}
      className={rootClasses.join(" ")}
    >
      {children}
    </div>
  );
};

export default MyModal;
