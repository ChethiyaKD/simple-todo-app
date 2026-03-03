import axios from "axios";
import type { ApiRequestTypes } from "@/types";
import { handleError } from "@/utils/errorHandler";

export const ApiClient = async ({
  body,
  method = "GET",
  url,
}: ApiRequestTypes) => {
  try {
    const response = await axios({
      method,
      url,
      data: body,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
