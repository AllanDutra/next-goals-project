import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
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

import styles from "./styles.module.scss";

interface GoalFormValues {
  title: string;
  description: string;
  status: GoalStatus;
  endForecast?: Date; // TODO: Perguntar se quer inserir ou não

  priority: string;
  metric: string;
  totalToAccomplish: string;
  totalAccomplished?: string;
}

export default function GoalFormPage() {
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

        <Content />
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

function Content() {
  const [goalFormValues] = useState<GoalFormValues>({
    title: "",
    description: "",
    status: GoalStatus.NotStarted,
    endForecast: new Date(),

    priority: "",
    metric: "",
    totalToAccomplish: "",
    totalAccomplished: "",
  });

  const [goalsStatuses] = useState<GoalStatus[]>([0, 1, 2, 3]);

  const [insertEndDate, setInsertEndDate] = useState(false);

  return (
    <form className={styles.form}>
      <div className={styles.gridGroup}>
        <div className={styles.formGrid}>
          <TextField
            autoFocus
            autoComplete="off"
            label="Título"
            name="title"
            value={goalFormValues.title}
          />

          <TextField
            autoComplete="off"
            label="Descrição"
            name="description"
            value={goalFormValues.description}
          />

          <FormControl>
            <InputLabel>Status</InputLabel>
            <Select label="Status" value={goalFormValues.status}>
              {goalsStatuses.map((goalStatus) => (
                <MenuItem value={goalStatus}>
                  {Status.getLabel(goalStatus)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className={styles.endForecastContainer}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={insertEndDate}
                  onChange={() => setInsertEndDate(!insertEndDate)}
                />
              }
              label="Inserir previsão de término"
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Previsão de término"
                inputFormat="DD/MM/YYYY"
                value={goalFormValues.endForecast}
                onChange={() => {}}
                renderInput={(params) => <TextField {...params} />}
                disabled={!insertEndDate}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className={styles.formGrid}>
          <TextField
            autoComplete="off"
            label="Prioridade"
            name="priority"
            value={goalFormValues.priority}
          />

          <TextField
            autoComplete="off"
            label="Métrica"
            name="metric"
            value={goalFormValues.metric}
          />

          <TextField
            autoComplete="off"
            label="Total a realizar"
            name="totalToAccomplish"
            value={goalFormValues.totalToAccomplish}
          />

          <TextField
            autoComplete="off"
            label="Total realizado"
            name="totalAccomplished"
            value={goalFormValues.totalAccomplished}
          />
        </div>
      </div>

      <div className={styles.buttonGrid}>
        <Link href="/">
          <button className={styles.outlineButton} type="button">
            Cancelar
          </button>
        </Link>

        <button className={styles.primaryButton} type="submit">
          Salvar
        </button>
      </div>
    </form>
  );
}

export const GoalForm = { Presentation, Content };
