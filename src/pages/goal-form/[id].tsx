import Head from "next/head";
import { useRouter } from "next/router";
import { GoalForm } from ".";
import { PageContainer } from "../../components/PageContainer";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function UpdateGoalForm() {
  const { query } = useRouter();

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

        <GoalForm.Content />
      </PageContainer>
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

  return {
    props: {},
  };
};
