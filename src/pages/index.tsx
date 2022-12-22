import Head from "next/head";
import { Sparkle } from "phosphor-react";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";

import styles from "../styles/styles.module.scss";

export default function Home() {
  const [goals, setGoals] = useState([]);

  return (
    <>
      <Head>
        <title>Goals - Alcançando objetivos</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.userPictureContainer}>
          <img
            src="https://sujeitoprogramador.com/steve.png"
            alt="User picture"
          />
        </div>

        <button>Sair</button>
      </header>

      <main className={styles.container}>
        <div className={styles.presentation}>
          <h1>Olá, Usuário! Acompanhe suas metas para o ano de 2023.</h1>

          <p>
            Usuário, você precisa estar mais focado, já fazem 3 dias que você
            não atualiza suas metas!
          </p>
        </div>

        {goals.length === 0 ? (
          <EmptyState
            icon={<Sparkle />}
            message="Você ainda não cadastrou nenhuma meta"
          />
        ) : (
          <ul className={styles.goalsList}>
            <li></li>
            <li></li>
          </ul>
        )}
      </main>
    </>
  );
}
