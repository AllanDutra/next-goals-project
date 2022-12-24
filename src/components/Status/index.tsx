import styles from "./styles.module.scss";

export enum GoalStatus {
  NotStarted = 0,
  InProgress = 1,
  Paused = 2,
  Finished = 3,
}

interface Props {
  statusData: GoalStatus;
}

function getLabel(goalStatus: GoalStatus): string {
  if (goalStatus === GoalStatus.NotStarted) return "Não iniciado";

  if (goalStatus === GoalStatus.InProgress) return "Em andamento";

  if (goalStatus === GoalStatus.Paused) return "Pausado";

  return "Finalizado";
}

function getColorVariant(goalStatus: GoalStatus): string {
  if (goalStatus === GoalStatus.NotStarted) return styles.notStarted;

  if (goalStatus === GoalStatus.InProgress) return styles.inProgress;

  if (goalStatus === GoalStatus.Paused) return styles.paused;

  return styles.finished;
}

function Tag({ statusData }: Props) {
  return (
    <span className={`${styles.container} ${getColorVariant(statusData)}`}>
      {getLabel(statusData)}
    </span>
  );
}

export const Status = { getLabel, Tag };
