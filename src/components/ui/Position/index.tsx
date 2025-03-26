import styles from "./Position.module.css";

type PositionProps = {
  children: React.ReactNode;
};

export function Position({ children }: PositionProps) {
  return <div className={styles.container}>{children}</div>;
}
