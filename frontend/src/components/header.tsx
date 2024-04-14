import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./header.module.css";

export type HeaderType = {
  /** Style props */
  propGap?: CSSProperties["gap"];

  /** Action props */
  onButtonContainerClick?: () => void;
};

const Header: FunctionComponent<HeaderType> = ({
  propGap,
  onButtonContainerClick,
}) => {
  const menuStyle: CSSProperties = useMemo(() => {
    return {
      gap: propGap,
    };
  }, [propGap]);

  return (
    <div className={styles.header}>
      <div className={styles.menu} style={menuStyle}>
        <img className={styles.logoIcon} alt="" src="logo.png" />
        <div className={styles.text}>Косплей</div>
        <div className={styles.text}>Конкурс рисунков</div>
        <div className={styles.text}>Аллея авторов</div>
      </div>
      <div className={styles.button} onClick={onButtonContainerClick}>
        <div className={styles.div}>Заявка на косплей</div>
      </div>
    </div>
  );
};

export default Header;
