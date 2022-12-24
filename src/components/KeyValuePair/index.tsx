import { IconContext } from "phosphor-react";
import { ReactNode } from "react";

import styles from "./styles.module.scss";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className={styles.container}>{children}</div>;
}

interface LabelProps {
  labelData: string;
  icon?: ReactNode;
}

function Label({ labelData, icon }: LabelProps) {
  return (
    <div className={styles.label}>
      {icon && (
        <IconContext.Provider
          value={{
            size: 20,
            weight: "regular",
          }}
        >
          {icon}
        </IconContext.Provider>
      )}

      <span>{labelData}</span>
    </div>
  );
}

interface ValueProps {
  valueData: ReactNode;
}

function Value({ valueData }: ValueProps) {
  return <span className={styles.value}>{valueData}</span>;
}

export const KeyValuePair = { Container, Label, Value };
