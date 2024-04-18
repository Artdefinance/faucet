import React, { useState, useMemo, useRef } from "react";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";

import axios from "axios";
import { ethers } from "ethers";
import { ToastContainer, toast, Bounce } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

import Input from "@/components/ui/input/Input";
import Button from "@/components/ui/button/Button";
import Logo from "@/assets/logo/Logo";
import SnsButtons from "@/components/ui/sns-buttons/SnsButtons";
import Title from "@/components/layout/title/Title";
import ToastSuccess from "@/components/icons/ToastSuccess";
import ToastError from "@/components/icons/ToastError";

const ToastAnimation = Bounce;

const Home = () => {
  const [address, setAddress] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recaptcha, setRecaptcha] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleReset = () => {
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
      .post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/sendToken`, {
        address,
        recaptchaResponse: recaptcha,
      })
      .then((response) => {
        const { result } = response.data;
        if (result) {
          toast.success(`Faucet success`, {
            transiiton: ToastAnimation,
            icon: <ToastSuccess />,
          });
          setIsSuccess(true);
        }
        if (!result) {
          toast.error(`You have already received payment to that address`, {
            transition: ToastAnimation,
            icon: <ToastError />,
          });
        }
        handleReset();
        setLoading(false);
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          transition: ToastAnimation,
          icon: <ToastError />,
        });
        setLoading(false);
        handleReset();
      });
  };

  return (
    <>
      <Head>
        <title>Artiside Seeding Testnet Faucet</title>
        <meta name="description" content="Artiside Seeding Testnet Faucet" />
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
            {!isSuccess ? (
              <div className={styles.inputWrapper}>
                <Input
                  value={address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={(!address || !isAddressValidate) && touched}
                  placeholder="Amoy ADF Testnet address"
                />
                <Button
                  disabled={
                    !address || !isAddressValidate || !recaptcha || loading
                  }
                  onClick={handleSubmit}
                >
                  Send me Tokens
                  {loading && <span className={styles.loader}></span>}
                </Button>
              </div>
            ) : (
              <div className={styles.seeding}>
                <Link
                  href="https://artiside.testnet.artdefinance.io/launchpad"
                  target="_blank"
                >
                  Go to Launchpad &nbsp;{">"}
                </Link>
              </div>
            )}
            {!isSuccess && (
              <div className={styles.recaptcha}>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
                  onChange={handleRecaptchaChange}
                  ref={recaptchaRef}
                  hl="en"
                />
              </div>
            )}
          </section>
          <ToastContainer
            position="top-center"
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
        <p>© 2024 Art de Finance. All Rights Reserved</p>
        <SnsButtons />
      </footer>
    </>
  );
};

export default Home;
