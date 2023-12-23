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
  user: User;
  goalsData: GoalProps[];
}

export default function Home({ user, goalsData }: Props) {
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
          title={`Olá, ${
            user.firstName
          }! Acompanhe suas metas para o ano de ${new Date().getFullYear()}.`}
          subtitle="Um sonho não se torna realidade num passe de mágica, requer suor, determinação e trabalho duro."
        />

        {goalsData.length === 0 ? (
          <EmptyState
            icon={<Sparkle />}
            message="Você ainda não cadastrou nenhuma meta"
          />
        ) : (
          <ul className={styles.goalsList}>
            {goalsData.map((goal) => (
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
    .get();

  const goalsData = goals.docs.map((goalItem) => {
    return { ...goalItem.data(), id: goalItem.id };
  });

  const user: User = {
    fullName: session.user.name || "",
    firstName: Utils.getOnlyFirstName(session.user.name),
  };

  return {
    props: {
      user,
      goalsData: Utils.sortGoalsData(goalsData as GoalProps[]),
    },
  };
};
