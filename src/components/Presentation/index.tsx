import styles from "./styles.module.scss";

export interface PresentationProps {
  title: string;
  subtitle?: string;
}

export function Presentation({ title, subtitle }: PresentationProps) {
  return (
    <div className={styles.presentation}>
      <h1>{title}</h1>

      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
