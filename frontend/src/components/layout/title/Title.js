import Link from "next/link";
import styles from "./Title.module.css";

import TitleWeb from "@/assets/title/TitleWeb";

const Title = () => (
  <div className={styles.wrapper}>
    <TitleWeb />
    <p className={styles.text}>
      Mumbai Seeding Test Token Address:{" "}
      <Link
        href="https://mumbai.polygonscan.com/address/0xbD98E53C3a54F329eF362916f337c2ddDb883ECd"
        target="_blank"
      >
        0xbD98E53C3a54F329eF362916f337c2ddDb883ECd
      </Link>
    </p>
  </div>
);

export default Title;
