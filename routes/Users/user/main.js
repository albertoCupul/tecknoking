const express = require('express');

const validate = require('../../../public/javascript/modules/validateData/validateUserClient');

const nUser = require('./create');
const eUser = require('./edit');
const dUser = require('./delete');
const gUser = require('./getList');

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routeUser = express.Router();

routeUser.post('/new', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = validate.validateUser(object);
    }
    if (isValid) {
      response = await nUser(object);
      if (response) {
        response = respApi.createSuccess(201, 'User', 'New', 'Usuario creado exitosamente.');
      } else {
        response = respApi.createSuccess(400, 'User', 'New', 'No esta enviando todos los datos requeridos para la alta del usuario.');
      }
    } else {
      response = respApi.createSuccess(400, 'User', 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'User', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeUser.put('/edit', async (req, resp) => {
  try {
    const object = req.body;
    const idUser = object.id;
    let isValidInfo = false;
    let isValidId = false;
    let response;
    if (object) {
      isValidInfo = validate.validateUser(object);
      isValidId = validate.identificador(idUser);
    }
    if (isValidInfo && isValidId) {
      response = await eUser(object);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'User', 'Edit', 'Usuario editado exitosamente.');
          break;
        case 2:
          response = respApi.createSuccess(400, 'User', 'Edit', 'Id de usuario no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(400, 'User', 'Edit', 'No esta enviando todos los datos requeridos para la alta del usuario.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, 'User', 'Edit', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }

    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'User', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeUser.delete('/delete/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = validate.identificador(id);
    }
    if (isValid) {
      response = await dUser(id);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'User', 'Delete', 'Usuario eliminado exitosamente.');
          break;
        case 2:
          response = respApi.createSuccess(400, 'User', 'Delete', 'Id de usuario no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(400, 'User', 'Delete', 'No esta enviando todos los datos requeridos para la alta del usuario.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, 'User', 'Delete', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'User', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeUser.get('/getList', async (req, resp) => {
  try {
    const list = await gUser();
    let response;
    if (list) {
      response = respApi.getSuccess(100, 'User', 'All Users', list);
    } else {
      response = respApi.createSuccess(400, 'User', 'All Users', 'No existen actualmente usuarios registradas.');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'User', 'All Users', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

module.exports = routeUser;
