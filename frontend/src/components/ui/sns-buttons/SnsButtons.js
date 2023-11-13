import React from "react";
import styles from "./SnsButtons.module.css";
import Link from "next/link";

import Discord from "@/assets/sns-icons/Discord";
import Insta from "@/assets/sns-icons/Insta";
import Medium from "@/assets/sns-icons/Medium";
import Twitter from "@/assets/sns-icons/Twitter";

function SnsButtons() {
  return (
    <div className={styles.box}>
      <button>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/art_de_finance/"
        >
          <Insta />
        </Link>
      </button>
      <button>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://discord.com/invite/art-de-finance"
        >
          <Discord />
        </Link>
      </button>
      <button>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/ArtdeFinance"
        >
          <Twitter />
        </Link>
      </button>
      <button>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://medium.com/@Art_de_Finance"
        >
          <Medium />
        </Link>
      </button>
    </div>
  );
}

export default SnsButtons;
