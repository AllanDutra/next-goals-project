import moment from "moment";
import { BatteryCharging, Clock, PresentationChart } from "phosphor-react";
import { KeyValuePair } from "../KeyValuePair";
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
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{goalData.title}</h2>

        <p>{goalData.description}</p>
      </div>

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
    </div>
  );
}
