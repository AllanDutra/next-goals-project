import { IconContext } from "phosphor-react";
import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  icon: ReactNode;
  message: string;
}

export function EmptyState({ icon, message }: Props) {
  return (
    <div className={styles.container}>
      <IconContext.Provider
        value={{
          size: 120,
          weight: "fill",
        }}
      >
        {icon}
      </IconContext.Provider>{" "}
      <p>{message}</p>
    </div>
  );
}
