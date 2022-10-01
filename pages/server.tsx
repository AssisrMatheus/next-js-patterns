import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import UserProfile from "../components/UserProfile";
import { optionalAuth } from "../lib/next-auth/auth";

const Server: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Server</title>
      </Head>

      <main className={styles.main}>
        <UserProfile />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await optionalAuth({ req, res }),
    },
  };
};

export default Server;
