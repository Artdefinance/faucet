import styles from "./Title.module.css";

import TitleWeb from "@/assets/title/TitleWeb";

const Title = ({ isSuccess }) => (
  <div className={styles.wrapper}>
    <TitleWeb />
    {!isSuccess && (
      <p className={styles.text}>
        Enter your wallet address to receive the payment
      </p>
    )}
  </div>
);

export default Title;
