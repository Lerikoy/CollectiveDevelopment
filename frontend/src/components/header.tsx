import { FunctionComponent, useMemo, useState, type CSSProperties } from "react";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const menuStyle: CSSProperties = useMemo(() => {
    return {
      gap: propGap,
    };
  }, [propGap]);
   
  const whatsappNumber = "+79142700837";

  return (
    <div className={styles.header}>
      <div className={styles.menu} style={menuStyle}>
        <img className={styles.logoIcon} alt="" src="logo.png" />
        <a className={styles.text} href="/">Главная</a>
        <a className={styles.text} href="/cosplay">Ззаявка на косплей</a>
        <a
          className={styles.text}
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Связаться с нами
        </a>
      </div>
    </div>
  );
};

export default Header;
