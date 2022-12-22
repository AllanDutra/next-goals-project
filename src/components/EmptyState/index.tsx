import { IconContext } from "phosphor-react";
import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface IEmptyStateProps {
  icon: ReactNode;
  message: string;
}

export function EmptyState({ icon, message }: IEmptyStateProps) {
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
