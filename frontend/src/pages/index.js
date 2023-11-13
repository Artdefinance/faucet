import React, { useState, useMemo, useRef } from "react";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import { Lexend } from "next/font/google";

import axios from "axios";
import { ethers } from "ethers";
import { ToastContainer, toast, Zoom } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

import Input from "@/components/ui/input/Input";
import Button from "@/components/ui/button/Button";
import Logo from "@/assets/logo/Logo";
import SnsButtons from "@/components/ui/sns-buttons/SnsButtons";
import Title from "@/components/layout/title/Title";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--lexend-font",
});

const Home = () => {
  const [address, setAddress] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recaptcha, setRecaptcha] = useState(null);

  const recaptchaRef = useRef(undefined);

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

  const reset = () => {
    setAddress("");
    setTouched(false);
    setRecaptcha(null);
    recaptchaRef.current.reset();
  };

  const handleRecaptchaChange = (value) => {
    setRecaptcha(value);
  };

  const handleSubmit = () => {
    setLoading(true);

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/faucets`, {
        address,
        captchaResponse: recaptcha,
      })
      .then((response) => {
        console.log(`tx Hash : ${JSON.stringify(response.data)}`);
        toast.success(`Faucet Success`, { transition: Zoom });
        reset();
        setLoading(false);
      })
      .catch((err) => {
        let errText = "Faucet Fail";
        if (typeof err.response == "undefined" || err.response == null) {
          errText = "Unknown status";
        } else {
          switch (err.response.status) {
            case 400:
              errText = "Invalid request";
              break;
            case 403:
              errText = "Too many requests";
              break;
            case 404:
              errText = "Cannot connect to server";
              break;
            case 502:
            case 503:
              errText = "Faucet service temporary unavailable";
              break;
            default:
              errText = err.response.data || err.message;
              break;
          }
        }
        toast.error(`${errText}`, { transition: Zoom });
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>ADF Testnet Faucet</title>
        <meta name="description" content="ADF Testnet Faucet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Logo />
      </header>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <Title />
          <section className={styles.section}>
            <div className={styles.inputWrapper}>
              <Input
                value={address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(!address || !isAddressValidate) && touched}
                placeholder="Mumbai ADF Testnet address"
              />
              <Button
                disabled={
                  !address || !isAddressValidate || !recaptcha || loading
                }
                onClick={handleSubmit}
              >
                Send me Tokens
              </Button>
            </div>
            <div className={styles.recaptcha}>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
                onChange={handleRecaptchaChange}
                ref={recaptchaRef}
                hl="en"
              />
            </div>
          </section>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.blank}></div>
        <p>© 2023 Art de Finance. All Rights Reserved</p>
        <SnsButtons />
      </footer>
    </>
  );
};

export default Home;
