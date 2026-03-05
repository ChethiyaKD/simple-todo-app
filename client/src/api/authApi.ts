import { ApiClient } from "./apiClient";
import { config } from "@/config";

const baseUrl = config.baseUrl;

export const getAuthToken = async () => {
  const url = `${baseUrl}/auth/`;
  return ApiClient({
    url,
    method: "GET",
  });
};
