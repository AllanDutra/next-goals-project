import { title } from "process";
import styles from "./styles.module.scss";

interface Props {
  title: string;
  subtitle?: string;
}

export function Presentation({ title, subtitle }: Props) {
  return (
    <div className={styles.presentation}>
      <h1>{title}</h1>

      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
