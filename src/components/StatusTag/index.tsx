export enum GoalStatus {
  NotStarted = 0,
  InProgress = 1,
  Paused = 2,
  Finished = 3,
}

interface Props {
  statusData: GoalStatus;
}

export function StatusTag({ statusData }: Props) {
  return <span>{statusData}</span>;
}
