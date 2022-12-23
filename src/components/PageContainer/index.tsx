import { ReactNode } from "react";

import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
}

export function PageContainer({ children }: Props) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.userPictureContainer}>
          <img
            src="https://sujeitoprogramador.com/steve.png"
            alt="User picture"
          />
        </div>

        <button>Sair</button>
      </header>

      <main className={styles.container}>{children}</main>
    </>
  );
}
