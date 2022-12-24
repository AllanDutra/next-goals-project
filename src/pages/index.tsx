import Head from "next/head";
import { Plus, Sparkle } from "phosphor-react";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { IconButton } from "../components/IconButton";
import { Goal, GoalProps } from "../components/Goal";
import { PageContainer } from "../components/PageContainer";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import styles from "../styles/styles.module.scss";
import { Presentation } from "../components/Presentation";
import {
  GoalInfoToDelete,
  ModalConfirmExcludeGoal,
} from "../components/ModalConfirmExcludeGoal";
import { Utils } from "../functions/Utils";

import firebase from "../services/firebaseConnection";

interface User {
  fullName: string;
  firstName: string;
}

interface Props {
  user: string;
  goalsData: string;
}

export default function Home({ user, goalsData }: Props) {
  const [userInfo] = useState<User>(JSON.parse(user));

  const [goals] = useState<GoalProps[]>(JSON.parse(goalsData));

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
          title={`Olá, ${userInfo.firstName}! Acompanhe suas metas para o ano de 2023.`}
          subtitle={`${userInfo.firstName}, você precisa estar mais focado, já fazem 3 dias que você
        não atualiza suas metas!`}
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  const goals = await firebase
    .firestore()
    .collection("goals")
    .where("userEmail", "==", session.user.email)
    .orderBy("priority", "desc")
    .get();

  const goalsData = JSON.stringify(
    goals.docs.map((goalItem) => {
      return { ...goalItem.data() };
    })
  );

  const user: User = {
    fullName: session.user.name || "",
    firstName: Utils.getOnlyFirstName(session.user.name),
  };

  return {
    props: {
      user,
      goalsData,
    },
  };
};
