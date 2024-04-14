import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./competitions.module.css";

export type CompetitionsType = {
  cover?: string;
  title?: string;
  desc?: string;

  /** Style props */
  button?: CSSProperties["alignSelf"];

  /** Action props */
  onFrameContainer13Click?: () => void;
};

const Competitions: FunctionComponent<CompetitionsType> = ({
  cover,
  title,
  desc,
  button,
  onFrameContainer13Click,
}) => {
  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: button,
    };
  }, [button]);

  return (
    <div className={styles.component}>
      <img className={styles.componentImg} alt="" src={cover} />
      <div className={styles.parent}>
        <div className={styles.date}>12.05.24 - 26.07.24</div>
        <div className={styles.title}>
          <p className={styles.p}>{title}</p>
        </div>
        <div className={styles.desc}>{desc}</div>
      </div>
      <div
        className={styles.button}
        onClick={onFrameContainer13Click}
        style={buttonStyle}
        >
            <div className={styles.buttonText}>Подать заявку</div>
      </div>
    </div>
  );
};

export default Competitions;
