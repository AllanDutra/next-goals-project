import Head from "next/head";
import { GoalForm, GoalFormValues } from ".";
import { GoalProps } from "../../components/Goal";
import { PageContainer } from "../../components/PageContainer";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import firebase from "../../services/firebaseConnection";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { GoalStatus } from "../../components/Status";

interface GoalDetails extends GoalProps, GoalFormValues {
  insertEndDate?: boolean;
  userEmail: string;
}

interface UpdateGoalFormProps {
  goalDetailsData: string;
}

export default function UpdateGoalForm({
  goalDetailsData,
}: UpdateGoalFormProps) {
  const router = useRouter();

  const [goalDetails] = useState(JSON.parse(goalDetailsData) as GoalDetails);

  async function handleUpdateGoal(
    goalFormValues: GoalFormValues,
    insertEndDate: boolean = false
  ) {
    function getUpdatedGoalStatus(): GoalStatus {
      if (goalFormValues.totalAccomplished === goalFormValues.totalToAccomplish)
        return GoalStatus.Finished;

      if (goalFormValues.status === GoalStatus.Finished)
        return GoalStatus.InProgress;

      return goalFormValues.status;
    }

    const updateGoalData = {
      ...goalFormValues,
      status: getUpdatedGoalStatus(),
      updated: new Date().toISOString(),
      endForecast: insertEndDate
        ? goalFormValues.endForecast?.toISOString()
        : firebase.firestore.FieldValue.delete(),
    };

    try {
      await firebase
        .firestore()
        .collection("goals")
        .doc(goalDetails.id)
        .update(updateGoalData);

      toast("Meta atualizada com sucesso!", {
        type: "success",
      });

      router.push("/");
    } catch (err) {
      toast(`Não foi possível atualizar a meta: ${JSON.stringify(err)}`, {
        type: "error",
      });
    }
  }

  return (
    <>
      <Head>
        <title>Goals - Atualizar meta</title>
      </Head>

      <PageContainer>
        <GoalForm.Presentation
          title={`Atualizar meta`}
          subtitle="Edite as informações da meta nos campos abaixo"
        />

        <GoalForm.Content
          initialValues={{
            ...goalDetails,
            endForecast: goalDetails.endForecast?.toString(),
            totalAccomplished: goalDetails.totalAccomplished || 0,
          }}
          onSubmit={handleUpdateGoal}
        />
      </PageContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params;
  const session = await getSession({ req });

  if (!session?.user)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  const goalDetailsData = await firebase
    .firestore()
    .collection("goals")
    .doc(id)
    .get()
    .then((snapshot) => {
      const snapshotData = snapshot.data();

      if (snapshotData) {
        const goalDetailsData: GoalDetails = {
          id: snapshot.id,
          createdAt: snapshotData.createdAt,
          description: snapshotData.description,
          metric: snapshotData.metric,
          priority: snapshotData.priority,
          status: snapshotData.status,
          title: snapshotData.title,
          totalToAccomplish: snapshotData.totalToAccomplish,
          totalAccomplished: snapshotData.totalAccomplished || 0,
          endForecast: snapshotData.endForecast || undefined,
          insertEndDate: snapshotData.endForecast ? true : false,
          updated: snapshotData.updated,
          userEmail: snapshotData.userEmail,
        };

        return JSON.stringify(goalDetailsData);
      }
    });

  return {
    props: {
      goalDetailsData,
    },
  };
};
