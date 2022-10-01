import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import AuthForm from "../../components/AuthForm";
import styles from "../../styles/Home.module.css";

const SignIn: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sign In</title>
      </Head>

      <main className={styles.main}>
        <AuthForm onSubmit={(form) => signIn("credentials", form)} />
      </main>
    </div>
  );
};

export default SignIn;
