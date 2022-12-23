import { IconContext } from "phosphor-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./styles.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
}

export function FloatingButton({ icon }: Props) {
  return (
    <button className={styles.container}>
      <IconContext.Provider
        value={{
          size: 25,
          weight: "bold",
        }}
      >
        {icon}
      </IconContext.Provider>
    </button>
  );
}
