import Head from "next/head";

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

        <button>
          Entrar com o Google <img src="/google-logo.svg" alt="google logo" />
        </button>
      </main>
    </>
  );
}
