import { addToast } from "@heroui/toast";
import alertColors from "../constants/alertColors";

export const handleError = (error: any) => {
  if (error.response) {
    addToast({
      title: "Error",
      description: error.response.data.message,
      color: alertColors.error,
    });
  } else if (error.request) {
    addToast({
      title: "Error",
      description: error.request.message,
      color: alertColors.error,
    });
  } else {
    addToast({
      title: "Error",
      description: error.message,
      color: alertColors.error,
    });
  }
};
