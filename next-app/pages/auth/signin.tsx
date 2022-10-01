import type { NextPage } from "next";
import Head from "next/head";
import AuthSignIn from "../../components/AuthSignIn";
import styles from "../../styles/Home.module.css";

const SignIn: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sign In</title>
      </Head>

      <main className={styles.main}>
        <AuthSignIn />
      </main>
    </div>
  );
};

export default SignIn;
