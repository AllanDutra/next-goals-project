import {
  Checkbox,
  createTheme,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "phosphor-react";
import { useState } from "react";
import { IconButton } from "../../components/IconButton";
import { PageContainer } from "../../components/PageContainer";
import {
  Presentation as PresentationComponent,
  PresentationProps,
} from "../../components/Presentation";
import { GoalStatus, Status } from "../../components/Status";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./styles.module.scss";
import { useRouter } from "next/router";

import firebase from "../../services/firebaseConnection";

import { toast } from "react-toastify";

export interface GoalFormValues {
  title: string;
  description: string;
  status: GoalStatus;
  endForecast?: Date;

  priority: number;
  metric: string;
  totalToAccomplish: number;
  totalAccomplished?: number;
}

interface GoalFormPageProps {
  userEmail: string;
}

interface GoalFormContentProps {
  onSubmit(
    goalFormValues: GoalFormValues,
    insertEndDate?: boolean
  ): Promise<void>;
}

const formTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8B949E" },
  },
});

export default function GoalFormPage({ userEmail }: GoalFormPageProps) {
  const router = useRouter();

  async function handleAddNewGoal(
    goalFormValues: GoalFormValues,
    insertEndDate: boolean = false
  ) {
    const newGoalData = {
      ...goalFormValues,
      createdAt: new Date().toISOString(),
      endForecast: goalFormValues.endForecast?.toISOString() || undefined,
      userEmail,
    };

    if (!insertEndDate) {
      delete newGoalData.endForecast;
    }

    try {
      await firebase.firestore().collection("goals").add(newGoalData);

      toast("Nova meta adicionada com sucesso!", {
        type: "success",
      });

      router.push("/");
    } catch (err) {
      toast(`Não foi possível cadastrar a nova meta: ${JSON.stringify(err)}`);
    }
  }

  return (
    <>
      <Head>
        <title>Goals - Adicionar nova meta</title>
      </Head>

      <PageContainer>
        <Presentation
          title="Adicionar nova meta"
          subtitle="Preencha os campos abaixo para cadastrar uma nova meta"
        />

        <Content onSubmit={handleAddNewGoal} />
      </PageContainer>
    </>
  );
}

function Presentation({ title, subtitle }: PresentationProps) {
  return (
    <div className={styles.presentationContainer}>
      <IconButton.Link href="/">
        <IconButton.Button icon={<ArrowLeft />} size="default" />
      </IconButton.Link>

      <PresentationComponent title={title} subtitle={subtitle} />
    </div>
  );
}

const GoalFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.preprocess(Number, z.number()),
  insertEndDate: z.boolean().optional(),
  endForecast: z.string().optional(),
  priority: z.preprocess(
    Number,
    z.number({
      invalid_type_error: "Informe um número válido",
    })
  ),
  metric: z.string(),
  totalToAccomplish: z.preprocess(
    Number,
    z.number({
      invalid_type_error: "Informe um número válido",
    })
  ),
  totalAccomplished: z.preprocess(
    Number,
    z.number({
      invalid_type_error: "Informe um número válido",
    })
  ),
});

type GoalFormSchemaType = z.infer<typeof GoalFormSchema>;

function Content({ onSubmit: onSubmitForm }: GoalFormContentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GoalFormSchemaType>({
    resolver: zodResolver(GoalFormSchema),
  });

  const [goalsStatuses] = useState<GoalStatus[]>([0, 1, 2, 3]);

  const [insertEndDate, setInsertEndDate] = useState(false);

  const [endForecastDate, setEndForecastDate] = useState<Date | null>(
    new Date()
  );

  const onSubmit: SubmitHandler<GoalFormSchemaType> = async (
    goalFormValuesValidatedInZod
  ) => {
    await onSubmitForm(
      {
        ...goalFormValuesValidatedInZod,
        endForecast: endForecastDate || undefined,
      },
      insertEndDate
    );
  };

  return (
    <ThemeProvider theme={formTheme}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.gridGroup}>
          <div className={styles.formGrid}>
            <div className={styles.inputContainer}>
              <TextField
                autoFocus
                autoComplete="off"
                label="Título"
                required
                {...register("title")}
                disabled={isSubmitting}
              />

              {errors.title && (
                <p className={styles.errorMessage}>{errors.title.message}</p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <TextField
                autoComplete="off"
                label="Descrição"
                required
                {...register("description")}
                disabled={isSubmitting}
              />

              {errors.description && (
                <p className={styles.errorMessage}>
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <FormControl>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  defaultValue={GoalStatus.NotStarted}
                  {...register("status")}
                  disabled={isSubmitting}
                >
                  {goalsStatuses.map((goalStatus) => (
                    <MenuItem key={goalStatus} value={goalStatus}>
                      {Status.getLabel(goalStatus)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {errors.status && (
                <p className={styles.errorMessage}>{errors.status.message}</p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.endForecastContainer}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={insertEndDate}
                      {...register("insertEndDate")}
                      disabled={isSubmitting}
                      onChange={() => setInsertEndDate(!insertEndDate)}
                    />
                  }
                  label="Inserir previsão de término"
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Previsão de término"
                    inputFormat="DD/MM/YYYY"
                    value={endForecastDate}
                    onChange={(newValue) => setEndForecastDate(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} {...register("endForecast")} />
                    )}
                    disabled={!insertEndDate || isSubmitting}
                  />
                </LocalizationProvider>
              </div>

              {errors.insertEndDate && (
                <p className={styles.errorMessage}>
                  {errors.insertEndDate.message}
                </p>
              )}
              {errors.endForecast && (
                <p className={styles.errorMessage}>
                  {errors.endForecast.message}
                </p>
              )}
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputContainer}>
              <TextField
                autoComplete="off"
                label="Prioridade"
                required
                inputMode="numeric"
                {...register("priority")}
                disabled={isSubmitting}
              />

              {errors.priority && (
                <p className={styles.errorMessage}>{errors.priority.message}</p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <TextField
                autoComplete="off"
                label="Métrica"
                required
                {...register("metric")}
                disabled={isSubmitting}
              />

              {errors.metric && (
                <p className={styles.errorMessage}>{errors.metric.message}</p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <TextField
                autoComplete="off"
                label="Total a realizar"
                required
                inputMode="numeric"
                {...register("totalToAccomplish")}
                disabled={isSubmitting}
              />

              {errors.totalToAccomplish && (
                <p className={styles.errorMessage}>
                  {errors.totalToAccomplish.message}
                </p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <TextField
                autoComplete="off"
                label="Total realizado"
                inputMode="numeric"
                {...register("totalAccomplished")}
                disabled={isSubmitting}
              />

              {errors.totalAccomplished && (
                <p className={styles.errorMessage}>
                  {errors.totalAccomplished.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.buttonGrid}>
          <Link href="/">
            <button
              className={styles.outlineButton}
              type="button"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </Link>

          <button
            className={styles.primaryButton}
            type="submit"
            disabled={isSubmitting}
          >
            Salvar
          </button>
        </div>
      </form>
    </ThemeProvider>
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
    props: {
      userEmail: session.user.email,
    },
  };
};

export const GoalForm = { Presentation, Content };
