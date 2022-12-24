import { ReactNode } from "react";

import { signOut, useSession } from "next-auth/react";

import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
}

export function PageContainer({ children }: Props) {
  const { data: session } = useSession();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.userPictureContainer}>
          <img src={session?.user?.image || ""} alt="User picture" />
        </div>

        <button onClick={() => signOut()}>Sair</button>
      </header>

      <main className={styles.container}>{children}</main>
    </>
  );
}
