import React, { useState, useMemo, useRef } from "react";
import Head from "next/head";
import { Lexend } from "next/font/google";
import { ethers } from "ethers";
import { ToastContainer, toast, Zoom } from "react-toastify";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "@/styles/Home.module.css";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

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
      <main className={styles.main}>
        <div className={`${styles.center} ${lexend.variable}`}>
          <h1>ADF Testnet Faucet</h1>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
            onChange={handleRecaptchaChange}
            ref={recaptchaRef}
          />
          <Input
            value={address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(!address || !isAddressValidate) && touched}
            placeholder="Enter your address"
          />
          <Button
            disabled={!address || !isAddressValidate || !recaptcha || loading}
            onClick={handleSubmit}
          >
            Send me tokens !
          </Button>
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
          <div className={styles.footer}>
            © 2023 <b>Art de Finance</b>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
