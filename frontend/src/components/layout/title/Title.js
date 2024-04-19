import Link from "next/link";
import styles from "./Title.module.css";

import TitleWeb from "@/assets/title/TitleWeb";

const Title = () => (
  <div className={styles.wrapper}>
    <TitleWeb />
    <p className={styles.text}>
      Amoy Launchpad Test Token Address:{" "}
      <Link
        href="https://amoy.polygonscan.com/address/0xC4Af1A414d115882CE5E270C2a42888AeF5d75D5"
        target="_blank"
      >
        0xC4Af1A414d115882CE5E270C2a42888AeF5d75D5
      </Link>
    </p>
    <Link
      className={styles.amoyFaucet}
      href="https://faucet.polygon.technology/"
      target="_blank"
    >
      Polygon PoS (Amoy) MATIC Faucet
    </Link>
  </div>
);

export default Title;
