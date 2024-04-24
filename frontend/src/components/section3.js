import styles from "./section.module.css";

function Section3() {

    return (
    <div className={styles.sectionMain}>
        
      <div className={styles.numberParent}>
        <div className={styles.circle} />
        <div className={styles.num}>{`1 `}</div>
      </div>

      <div className={styles.sectionText}>Личные данные</div>

      <div className={styles.line} />

      <div className={styles.numberParent}>
        <div className={styles.circle} />
        <div className={styles.num}>2</div>
      </div>

      <div className={styles.sectionText}>Детали косплея</div>

      <div className={styles.line} />

      <div className={styles.numberParent}>
        <div className={styles.circle3} />
        <div className={styles.num}>3</div>
      </div>

      <div className={styles.sectionText3}>Согласие на обработку</div>
    </div>
  );
}

export default Section3;