import Head from "next/head";
import { useRouter } from "next/router";
import { GoalForm } from ".";
import { PageContainer } from "../../components/PageContainer";

export default function UpdateGoalForm() {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Goals - Atualizar meta</title>
      </Head>

      <PageContainer>
        <GoalForm.Presentation
          title={`Atualizar meta (${query.id})`}
          subtitle="Edite as informações da meta nos campos abaixo"
        />

        <GoalForm.Content />
      </PageContainer>
    </>
  );
}
