import moment from "moment";
import Link from "next/link";
import {
  BatteryCharging,
  Clock,
  IconContext,
  PencilSimple,
  PresentationChart,
  Trash,
} from "phosphor-react";
import { useMemo } from "react";
import { KeyValuePair } from "../KeyValuePair";
import { LinearProgress } from "../LinearProgress";
import { GoalInfoToDelete } from "../ModalConfirmExcludeGoal";
import { GoalStatus, Status } from "../Status";

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
  onExclude?(goalInfo: GoalInfoToDelete): void;
}

export function Goal({ goalData, onExclude }: Props) {
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
        <div className={styles.titleContainer}>
          <h2>
            {goalIsAccomplished && <img src="/check-circle.svg" alt="OK" />}

            {goalData.title}
          </h2>

          <IconContext.Provider
            value={{
              weight: "light",
              size: 20,
            }}
          >
            <div>
              <Link href={`/goal-form/${goalData.id}`}>
                <button>
                  Atualizar <PencilSimple />
                </button>
              </Link>

              <button
                onClick={() =>
                  onExclude?.({
                    id: goalData.id,
                    title: goalData.title,
                  })
                }
              >
                Excluir <Trash />
              </button>
            </div>
          </IconContext.Provider>
        </div>

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
              labelData="Previsão"
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
            valueData={<Status.Tag statusData={goalData.status} />}
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
