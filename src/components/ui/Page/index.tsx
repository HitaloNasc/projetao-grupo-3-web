import styles from "./Page.module.css";

export interface PageProps {
  children: React.ReactNode;
}

export function Page({ children }: PageProps) {
  return <div className={styles.container}>{children}</div>;
}
