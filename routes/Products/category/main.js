const express = require('express');

const validate = require('../../../public/javascript/modules/validateData/simpleValidate');

const nCategory = require('./create');
const eCategory = require('./edit');
const dCategory = require('./delete');
const glCategory = require('./getList');

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routCategory = express.Router();

routCategory.post('/new', async (req, resp) => {
  try {
    const { name } = req.body;
    let isValid = false;
    let response;
    if (name) {
      isValid = validate.name(name);
    }
    if (isValid) {
      response = await nCategory(name);
      if (response) {
        response = respApi.createSuccess(201, 'Category', 'New', 'Categoría creada exitosamente');
      } else {
        response = respApi.createSuccess(200, 'Category', 'New', 'Ya existe una Categoría almacenada con ese nombre');
      }
    } else {
      response = respApi.createSuccess(400, 'Category', 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Category', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routCategory.put('/edit', async (req, resp) => {
  try {
    const idRule = req.body.id;
    const newNameRule = req.body.name;
    let isValidName = false;
    let isValidId = false;
    let response;
    if (newNameRule) {
      isValidName = validate.name(newNameRule);
    }
    if (idRule) {
      isValidId = validate.name(idRule);
    }
    if (isValidId && isValidName) {
      response = await eCategory(idRule, newNameRule);
      if (response) {
        response = respApi.createSuccess(200, 'Category', 'Edit', 'Categoría actualizada exitosamente');
      } else {
        response = respApi.createSuccess(100, 'Category', 'Edit', 'Ya existe una Categoría almacenada con ese nombre');
      }
    } else {
      response = respApi.createSuccess(400, 'Category', 'Edit', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Category', 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routCategory.delete('/delete/:id', async (req, resp) => {
  try {
    const idRule = req.params.id;
    let isValid = false;
    let response;
    if (idRule) {
      isValid = validate.identificador(idRule);
    }
    if (isValid) {
      dCategory(idRule);
      response = respApi.createSuccess(100, 'Category', 'Delete', 'Categoría eliminada exitosamente');
    } else {
      response = respApi.createSuccess(400, 'Category', 'Delete', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Category', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routCategory.get('/getList/', async (req, resp) => {
  try {
    const list = await glCategory();
    let response;
    if (list) {
      response = respApi.getSuccess(100, 'Category', 'All Categories', list);
    } else {
      response = respApi.createSuccess(400, 'Category', 'All Categories', 'No existen actualmente categorías registradas.');
    }

    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Category', 'All Categories', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

module.exports = routCategory;
