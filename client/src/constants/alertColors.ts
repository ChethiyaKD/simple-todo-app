const alertColors = {
  success: "success",
  error: "danger",
  warning: "warning",
  info: "primary",
  default: "default",
} as const;

export type AlertColors = keyof typeof alertColors;

export default alertColors;
