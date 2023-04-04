import { useState, useMemo } from "react";
import Head from "next/head";
import { Lexend } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { ethers } from "ethers";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--lexend-font",
});

const Home = () => {
  const [address, setAddress] = useState("");
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleBlur = () => {
    !touched && setTouched(true);
  };

  const isAddressValidate = useMemo(() => {
    const isAddress = ethers.isAddress;
    return isAddress(address);
  }, [address]);

  return (
    <>
      <Head>
        <title>ADF Testnet Faucet</title>
        <meta name="description" content="ADF Testnet Faucet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={lexend.variable}>
          <div className={styles.center}>
            <h1>ADF Testnet Faucet</h1>
            <Input
              value={address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={(!address || !isAddressValidate) && touched}
              placeholder="Enter your address"
            />
            <Button disabled={!address || !isAddressValidate}>
              Send me tokens !
            </Button>
            <div className={styles.footer}>© 2023 ART DE FINANACE</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
