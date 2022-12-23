import moment from "moment";
import { BatteryCharging, Clock, PresentationChart } from "phosphor-react";
import { useMemo } from "react";
import { KeyValuePair } from "../KeyValuePair";
import { LinearProgress } from "../LinearProgress";
import { GoalStatus, StatusTag } from "../StatusTag";

import styles from "./styles.module.scss";

export interface GoalProps {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updated?: Date;
  status: GoalStatus;
  priority: number;
  endForecast?: Date;
  metric: string;
  totalToAccomplish: number;
  totalAccomplished?: number;
}

interface Props {
  goalData: GoalProps;
}

export function Goal({ goalData }: Props) {
  const progress: number = useMemo(
    () =>
      (100.0 * (goalData.totalAccomplished || 0)) / goalData.totalToAccomplish,
    [goalData.totalAccomplished, goalData.totalToAccomplish]
  );

  const goalIsAccomplished: boolean = useMemo(
    () => progress === 100,
    [progress]
  );

  return (
    <div
      className={`${styles.container}${
        goalIsAccomplished ? ` ${styles.accomplishedContainer}` : ""
      }`}
    >
      <section className={styles.header}>
        <h2>
          {goalIsAccomplished && <img src="/check-circle.svg" alt="OK" />}

          {goalData.title}
        </h2>

        <p>{goalData.description}</p>
      </section>

      <div className={styles.attributes}>
        <KeyValuePair.Container>
          {goalData.updated ? (
            <>
              <KeyValuePair.Label labelData="Atualizado em" icon={<Clock />} />
              <KeyValuePair.Value
                valueData={moment(goalData.updated).format("LLL")}
              />
            </>
          ) : (
            <>
              <KeyValuePair.Label labelData="Criado em" icon={<Clock />} />
              <KeyValuePair.Value
                valueData={moment(goalData.createdAt).format("LLL")}
              />
            </>
          )}
        </KeyValuePair.Container>

        {goalData.endForecast ? (
          <KeyValuePair.Container>
            <KeyValuePair.Label
              labelData="Previsão de término"
              icon={<Clock />}
            />
            <KeyValuePair.Value
              valueData={moment(goalData.endForecast).format("LLL")}
            />
          </KeyValuePair.Container>
        ) : null}

        <KeyValuePair.Container>
          <KeyValuePair.Label labelData="Status" icon={<PresentationChart />} />
          <KeyValuePair.Value
            valueData={<StatusTag statusData={goalData.status} />}
          />
        </KeyValuePair.Container>

        <KeyValuePair.Container>
          <KeyValuePair.Label
            labelData="Prioridade"
            icon={<BatteryCharging />}
          />
          <KeyValuePair.Value valueData={goalData.priority} />
        </KeyValuePair.Container>
      </div>

      <section className={styles.progress}>
        <h3>
          Progresso de {goalData.metric}, {goalData.totalAccomplished || 0} de{" "}
          {goalData.totalToAccomplish}
        </h3>

        <LinearProgress progress={progress} />
      </section>
    </div>
  );
}
