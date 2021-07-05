const express = require('express');

const validate = require('../../../public/javascript/modules/validateData/validateProduct');

const nInventory = require('./create');
const eInventory = require('./edit');

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routeInvetory = express.Router();

routeInvetory.post('/new', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = validate.isValidInventory(object);
    }
    if (isValid) {
      response = await nInventory(object);
      switch (response) {
        case 1:
          response = respApi.createSuccess(201, 'Inventory', 'New', 'Inventario de producto creado exitosamente');
          break;
        case 2:
          response = respApi.createSuccess(400, 'Inventory', 'New', 'Id de producto no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(500, 'Inventory', 'New', 'Hubo un error al intentar guardar el inventario en el sistema.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, 'Inventory', 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Inventory', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeInvetory.put('/edit', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = validate.isValidInventory(object);
    }
    if (isValid) {
      response = await eInventory(object);
      switch (response) {
        case 1:
          response = respApi.createSuccess(201, 'Inventory', 'Edit', 'Inventario de editado exitosamente');
          break;
        case 2:
          response = respApi.createSuccess(400, 'Inventory', 'Edit', 'Id de producto no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(500, 'Inventory', 'Edit', 'Hubo un error al intentar actualizar el inventario en el sistema.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, 'Inventory', 'Edit', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Inventory', 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

module.exports = routeInvetory;
