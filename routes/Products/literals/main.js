const express = require('express');

const validate = require('../../../public/javascript/modules/validateData/validateLiterals');

const nLiteral = require('./create');
const eLiteral = require('./edit');
const dLiteral = require('./delete');
const glLiteral = require('./getList');

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routeLiterals = express.Router();

routeLiterals.post('/new', async (req, resp) => {
  try {
    const nameLiteral = req.body.name;
    const valueLiteral = req.body.value;
    let isValidName = false;
    let isValidValue = false;
    let response;
    if (nameLiteral && valueLiteral) {
      isValidName = validate.name(nameLiteral);
      isValidValue = validate.value(valueLiteral);
    }
    if (isValidName && isValidValue) {
      response = await nLiteral.create(nameLiteral, valueLiteral);
      if (response) {
        response = respApi.createSuccess(201, 'Literals', 'New', 'Literal creada exitosamente');
      } else {
        response = respApi.createSuccess(200, 'Literals', 'New', 'Ya existe una Literal almacenada con ese nombre');
      }
    } else {
      response = respApi.createSuccess(400, 'Literals', 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Literals', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeLiterals.put('/edit', async (req, resp) => {
  try {
    const nameLiteral = req.body.name;
    const valueLiteral = req.body.value;
    const idLiteral = req.body.id;
    let isValidName = false;
    let isValidValue = false;
    let isValidId = false;
    let response;
    if (nameLiteral && valueLiteral && idLiteral) {
      isValidName = validate.name(nameLiteral);
      isValidValue = validate.value(valueLiteral);
      isValidId = validate.identificador(idLiteral);
    }
    if (isValidName && isValidValue && isValidId) {
      response = await eLiteral.edit(idLiteral, nameLiteral, valueLiteral);
      if (response) {
        response = respApi.createSuccess(200, 'Literals', 'Edit', 'Literal actualizada exitosamente');
      } else {
        response = respApi.createSuccess(100, 'Literals', 'Edit', 'Ya existe una literal almacenada con ese nombre o está intentando modificar una literal del sistema.');
      }
    } else {
      response = respApi.createSuccess(400, 'Literals', 'Edit', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Literals', 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeLiterals.delete('/delete/:id', async (req, resp) => {
  try {
    const idLiteral = req.params.id;
    let isValidId = false;
    let response;
    if (idLiteral) {
      isValidId = validate.identificador(idLiteral);
    }
    if (isValidId) {
      response = await dLiteral.remove(idLiteral);
      if (response) {
        response = respApi.createSuccess(100, 'Literals', 'Delete', 'Literal eliminada exitosamente');
      } else {
        response = respApi.createSuccess(401, 'Literals', 'Delete', 'Permiso denegado para eliminar una literal del sistema.');
      }
    } else {
      response = respApi.createSuccess(400, 'Literals', 'Delete', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Literals', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeLiterals.get('/getList', async (req, resp) => {
  try {
    const list = await glLiteral();
    let response;
    if (list) {
      response = respApi.getSuccess(100, 'Rules', 'All Rules', list);
    } else {
      response = respApi.createSuccess(400, 'Rules', 'All Rules', 'No existen actualmente reglas registradas.');
    }

    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Rules', 'All Rules', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});
module.exports = routeLiterals;
