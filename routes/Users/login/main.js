const express = require('express');

const validate = require('../../../public/javascript/modules/validateData/validateUserClient');

const login = require('./login');

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routeLogin = express.Router();

routeLogin.post('/validate', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = validate.login(object);
    }
    if (isValid) {
      response = await login(object);
      switch (response) {
        case 2:
          response = respApi.createSuccess(400, 'Login', 'Validate', 'Login incorrecto.');
          break;
        case 3:
          response = respApi.createSuccess(400, 'Login', 'Validate', 'Error al validar el login. Favor de reintentar.');
          break;
        default:
          response = respApi.createTokenSuccess(100, 'Login', 'Validate', 'Login correcto.', response);
          break;
      }
    } else {
      response = respApi.createSuccess(400, 'Login', 'Validate', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Login', 'Validate', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

module.exports = routeLogin;
