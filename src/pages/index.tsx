import Head from "next/head";
import { Plus, Sparkle } from "phosphor-react";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { IconButton } from "../components/IconButton";
import { Goal, GoalProps } from "../components/Goal";
import { PageContainer } from "../components/PageContainer";
import { GoalStatus } from "../components/Status";

import styles from "../styles/styles.module.scss";
import { Presentation } from "../components/Presentation";
import {
  GoalInfoToDelete,
  ModalConfirmExcludeGoal,
} from "../components/ModalConfirmExcludeGoal";

export default function Home() {
  const [goals] = useState<GoalProps[]>([
    {
      id: "1",
      title: "Curso de NextJS na Udemy",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      createdAt: new Date("01-01-2001"),
      // updated?: Date;
      status: GoalStatus.Paused,
      priority: 50,
      // endForecast?: Date;
      metric: "Aulas",
      totalToAccomplish: 200,
      totalAccomplished: 70,
    },
    {
      id: "2",
      title: "Curso de NextJS na Udemy",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      createdAt: new Date("01-01-2001"),
      // updated?: Date;
      status: GoalStatus.Finished,
      priority: 50,
      // endForecast?: Date;
      metric: "Aulas",
      totalToAccomplish: 200,
      totalAccomplished: 200,
    },
  ]);

  const [goalInfoToDelete, setGoalInfoToDelete] = useState<GoalInfoToDelete>({
    id: "",
    title: "",
  });

  function handleExcludeGoal(goalInfo: GoalInfoToDelete) {
    setGoalInfoToDelete(goalInfo);
  }

  function handleCloseModalConfirmDeletion() {
    setGoalInfoToDelete({
      id: "",
      title: "",
    });
  }

  return (
    <>
      <Head>
        <title>Goals - Alcançando objetivos</title>
      </Head>

      <PageContainer>
        <Presentation
          title="Olá, Usuário! Acompanhe suas metas para o ano de 2023."
          subtitle="Usuário, você precisa estar mais focado, já fazem 3 dias que você
        não atualiza suas metas!"
        />

        {goals.length === 0 ? (
          <EmptyState
            icon={<Sparkle />}
            message="Você ainda não cadastrou nenhuma meta"
          />
        ) : (
          <ul className={styles.goalsList}>
            {goals.map((goal) => (
              <li key={goal.id}>
                <Goal goalData={goal} onExclude={handleExcludeGoal} />
              </li>
            ))}
          </ul>
        )}
      </PageContainer>

      <IconButton.Floating>
        <IconButton.Link href="/goal-form">
          <IconButton.Button icon={<Plus />} />
        </IconButton.Link>
      </IconButton.Floating>

      <ModalConfirmExcludeGoal
        goalInfoToDelete={goalInfoToDelete}
        onClose={handleCloseModalConfirmDeletion}
      />
    </>
  );
}
