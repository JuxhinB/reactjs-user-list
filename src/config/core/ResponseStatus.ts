import strLng from "../localization/strLng";
import { AxiosResponse } from "axios";

interface ResponseDataType {
  message?: string;
}

function responseCheck(arg: ResponseDataType) {
  if (arg.message) {
    return arg.message;
  } else {
    return strLng.ERROR.error;
  }
}

export function handleResponse(response: AxiosResponse<any>) {
  switch (response.status) {
    case 400:
      responseCheck(response.data);
      break;

    case 401:
      responseCheck(response.data);
      break;

    case 403:
      responseCheck(response.data);
      break;

    case 404:
      responseCheck(response.data);
      break;

    case 500:
      responseCheck(response.data);
      break;

    case 200:
      return true;

    default:
      return strLng.ERROR;
  }
}
