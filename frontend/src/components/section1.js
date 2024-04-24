import styles from "./section.module.css";

function Section() {

    return (
    <div className={styles.sectionMain}>
        
      <div className={styles.numberParent}>
        <div className={styles.circle1} />
        <div className={styles.num}>{`1 `}</div>
      </div>

      <div className={styles.sectionText1}>Личные данные</div>

      <div className={styles.line} />

      <div className={styles.numberParent}>
        <div className={styles.circle} />
        <div className={styles.num}>2</div>
      </div>

      <div className={styles.sectionText}>Детали косплея</div>

      <div className={styles.line} />

      <div className={styles.numberParent}>
        <div className={styles.circle} />
        <div className={styles.num}>3</div>
      </div>

      <div className={styles.sectionText}>Согласие на обработку</div>
    </div>
  );
}

export default Section;