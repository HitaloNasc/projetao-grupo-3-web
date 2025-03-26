import React from "react";
import styles from "./Loading.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

type BootstrapColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

type SpinnerSize = "sm" | "md" | "lg";

interface LoadingProps {
  message?: string;
  color?: BootstrapColor;
  size?: SpinnerSize;
}

const colorClasses: Record<BootstrapColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  danger: "text-danger",
  warning: "text-warning",
  info: "text-info",
  light: "text-light",
  dark: "text-dark",
};

const sizeClasses: Record<SpinnerSize, string> = {
  sm: styles["spinner-sm"],
  md: styles.spinner,
  lg: styles["spinner-lg"],
};

const Loading: React.FC<LoadingProps> = ({
  message,
  color = "primary",
  size = "md",
}) => {
  const spinnerColorClass = colorClasses[color];
  const spinnerSizeClass = sizeClasses[size];

  return (
    <div className={styles.container}>
      <div
        className={`spinner-border ${spinnerColorClass} ${spinnerSizeClass}`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Loading;
