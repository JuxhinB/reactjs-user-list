import axios, { AxiosRequestConfig } from "axios";

const baseUrl = "https://reqres.in/api";

interface FetchApiProps extends AxiosRequestConfig {
  customHeaders?: object;
}

export async function fetchApi({
  method,
  url,
  data = null,
  headers = null,
  customHeaders,
  ...restProps
}: FetchApiProps) {

  let config = {
    method: method,
    url: `${baseUrl}${url}`,
    ...data
  };

  const defaultHeaders = {
    Accept: "application/json"
  };

  let jointHeaders = null;

  jointHeaders = {
    ...defaultHeaders,
    headers: {
      ...customHeaders,
    }
  };

  try {
    return axios({
      ...config,
      ...jointHeaders,
      ...restProps
    });
  } catch (error) {
    return error;
  }
}
