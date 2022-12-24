import Head from "next/head";

import { GetServerSideProps } from "next";
import { signIn, getSession } from "next-auth/react";

import styles from "./styles.module.scss";

export default function Login() {
  return (
    <>
      <Head>
        <title>Goals - Entrar no Goals</title>
      </Head>

      <main className={styles.container}>
        <img src="/goals-icon.png" alt="goals logo" />

        <section>
          <h1>Entrar no Goals</h1>

          <span>Adicione suas metas e alcance seus objetivos</span>
        </section>

        <button onClick={() => signIn("google")}>
          Entrar com o Google <img src="/google-logo.svg" alt="google logo" />
        </button>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session?.user)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};
