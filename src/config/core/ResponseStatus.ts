import strLng from "../localization/strLng";

interface ResponseType {
  status: number;
  data: ResponseDataType;
}

interface ResponseDataType {
  message?: string;
  error?: string;
  error_message?: string;
}

const responseCheck = (arg: ResponseDataType) => {
  if (arg.message) {
    return arg.message;
  }
  if (arg.error) {
    return arg.error;
  }
  if (arg.error_message) {
    return arg.error_message;
  } else {
    return strLng.ERROR.error;
  }
};

const ResponseStatus = {
  handleResponse(response: ResponseType) {
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

      case 500:
        responseCheck(response.data);
        break;

      case 200:
        return true;

      default:
        return strLng.ERROR;
    }
  },
};

export default ResponseStatus;
