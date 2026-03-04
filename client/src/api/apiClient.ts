import axios, { type RawAxiosRequestHeaders } from "axios";
import type { ApiRequestTypes } from "@/types";
import { handleError } from "@/utils/errorHandler";
import { store } from "@/redux/store";

export const ApiClient = async ({
  body,
  method = "GET",
  url,
}: ApiRequestTypes) => {
  try {
    const token = store.getState().auth.token;

    const headers: RawAxiosRequestHeaders = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios({
      method,
      url,
      data: body,
      headers,
    });

    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
