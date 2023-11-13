import React from "react";
import Discord from "@/assets/sns-icons/Discord";
import Gitbook from "@/assets/sns-icons/Gitbook";
import Insta from "@/assets/sns-icons/Insta";
import Medium from "@/assets/sns-icons/Medium";
import Telegram from "@/assets/sns-icons/Telegram";
import Twitter from "@/assets/sns-icons/Twitter";
import Youtube from "@/assets/sns-icons/Youtube";
import styles from "./SnsButtons.module.css";

function SnsButtons() {
  return (
    <div className={styles.box}>
      <button>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://discord.com/invite/artdefinance"
        >
          <Discord />
        </a>
      </button>
      <button>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/ArtdeFinance"
        >
          <Twitter />
        </a>
      </button>
      <button>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/art_de_finance/"
        >
          <Insta />
        </a>
      </button>
      <button>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://medium.com/@Art_de_Finance"
        >
          <Medium />
        </a>
      </button>
      <button>
        <a target="_blank" rel="noreferrer" href="https://t.me/artdefinanceann">
          <Telegram />
        </a>
      </button>
      <button>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.youtube.com/@artdefinance"
        >
          <Youtube />
        </a>
      </button>
      <button>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://docs.artdefinance.io/"
        >
          <Gitbook />
        </a>
      </button>
    </div>
  );
}

export default SnsButtons;
