import type { NextPage } from "next";
import Head from "next/head";
import UserProfile from "../components/UserProfile";
import styles from "../styles/Home.module.css";

const Static: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Static</title>
      </Head>

      <main className={styles.main}>
        <UserProfile />
      </main>
    </div>
  );
};

export default Static;
