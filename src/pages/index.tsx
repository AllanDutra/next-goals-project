import Head from "next/head";
import { Plus, Sparkle } from "phosphor-react";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { FloatingButton } from "../components/FloatingButton";
import { Goal, GoalProps } from "../components/Goal";
import { GoalStatus } from "../components/StatusTag";

import styles from "../styles/styles.module.scss";

export default function Home() {
  const [goals] = useState<GoalProps[]>([
    {
      id: "1",
      title: "Curso de NextJS na Udemy",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      createdAt: new Date("01-01-2001"),
      // updated?: Date;
      status: GoalStatus.InProgress,
      priority: 50,
      // endForecast?: Date;
      metric: "Aulas",
      totalToAccomplish: 200,
      totalAccomplished: 70,
    },
    {
      id: "1",
      title: "Curso de NextJS na Udemy",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      createdAt: new Date("01-01-2001"),
      // updated?: Date;
      status: GoalStatus.InProgress,
      priority: 50,
      // endForecast?: Date;
      metric: "Aulas",
      totalToAccomplish: 200,
      totalAccomplished: 200,
    },
  ]);

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
            {goals.map((goal) => (
              <li key={goal.id}>
                <Goal goalData={goal} />
              </li>
            ))}
          </ul>
        )}
      </main>

      <FloatingButton icon={<Plus />} />
    </>
  );
}
