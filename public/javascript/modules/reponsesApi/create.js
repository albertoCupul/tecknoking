const responsesHttp = {
  100: 'CONTINUE',
  200: 'OK',
  201: 'CREATED',
  400: 'BAD REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT FOUND',
  424: 'FAILED DEPENDENCY',
  500: 'INTERNAL SERVER ERROR',
};

function searchCodeHttp(code) {
  let response = null;
  Object.entries(responsesHttp).forEach(([key, value]) => {
    if (parseInt(key, 10) === code) {
      response = value;
    }
  });
  return response;
}

function createSuccess(httpCode, module, action, message) {
  const httpResp = searchCodeHttp(httpCode);
  const success = {
    HTTP: httpCode,
    Response: httpResp,
    Module: module,
    Action: action,
    Message: message,
  };
  return success;
}

function createError(httpCode, module, action, message, error) {
  const httpResp = searchCodeHttp(httpCode);
  const success = {
    HTTP: httpCode,
    Response: httpResp,
    Module: module,
    Action: action,
    Message: message,
    Error: error,
  };
  return success;
}

function createTokenSuccess(httpCode, module, action, message, token) {
  const httpResp = searchCodeHttp(httpCode);
  const success = {
    HTTP: httpCode,
    Response: httpResp,
    Module: module,
    Action: action,
    Message: message,
    Token: token,
  };
  return success;
}

function getSuccess(httpCode, module, action, object) {
  const httpResp = searchCodeHttp(httpCode);
  const success = {
    HTTP: httpCode,
    Response: httpResp,
    Module: module,
    Action: action,
    Object: object,
  };
  return success;
}

module.exports.createSuccess = createSuccess;
module.exports.createError = createError;
module.exports.getSuccess = getSuccess;
module.exports.createTokenSuccess = createTokenSuccess;
