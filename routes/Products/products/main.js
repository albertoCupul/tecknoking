const express = require('express');

const validate = require('../../../public/javascript/modules/validateData/validateProduct');

const nProduct = require('./create');
const eProduct = require('./edit');
const dProduct = require('./delete');
const gadProduct = require('./getAllData');
const gProduct = require('./getList');

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routeProducts = express.Router();

routeProducts.post('/new', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = validate.isValidProduct(object);
    }
    if (isValid) {
      response = await nProduct(object);
      switch (response) {
        case 1:
          response = respApi.createSuccess(201, 'Product', 'New', 'Producto creado exitosamente');
          break;
        case 2:
          response = respApi.createSuccess(400, 'Product', 'New', 'Id de categoría no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(400, 'Product', 'New', 'Id de regla no existe en el sistema.');
          break;
        case 4:
          response = respApi.createSuccess(400, 'Product', 'New', 'Ya existe un producto almacenada con ese nombre o no esta enviando todos los datos requeridos.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, 'Product', 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Product', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeProducts.put('/edit', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = validate.isValidProductWithId(object);
    }
    if (isValid) {
      response = await eProduct(object);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'Product', 'Edit', 'Producto editado exitosamente');
          break;
        case 2:
          response = respApi.createSuccess(400, 'Product', 'Edit', 'Id de categoría no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(400, 'Product', 'Edit', 'Id de regla no existe en el sistema.');
          break;
        case 4:
          response = respApi.createSuccess(400, 'Product', 'Edit', 'Ya existe un producto almacenada con ese sku.');
          break;
        case 5:
          response = respApi.createSuccess(400, 'Product', 'Edit', 'Id de producto no existe en el sistema.');
          break;
        case 6:
          response = respApi.createSuccess(400, 'Product', 'Edit', 'No esta enviando todos los datos requeridos para la alta del producto.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, 'Product', 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Product', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeProducts.delete('/delete/:id', async (req, resp) => {
  try {
    const idProduct = req.params.id;
    let isValid = false;
    let response;
    if (idProduct) {
      isValid = validate.identificador(idProduct);
    }
    if (isValid) {
      response = await dProduct(idProduct);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'Product', 'Delete', 'Producto eliminado exitosamente');
          break;
        case 2:
          response = respApi.createSuccess(400, 'Product', 'Delete', 'Id de producto no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(400, 'Product', 'Delete', 'Hubo un error al intentar eliminar el producto, favor de reintentar.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, 'Product', 'Delete', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Product', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeProducts.get('/getAllData/:id', async (req, resp) => {
  try {
    const idProduct = req.params.id;
    let isValid = false;
    let response;
    let object;
    if (idProduct) {
      isValid = validate.identificador(idProduct);
    }
    if (isValid) {
      object = await gadProduct(idProduct);
      if (object) {
        response = respApi.createSuccess(100, 'Product', 'All Data Product', object);
      } else {
        response = respApi.createSuccess(424, 'Product', 'All Data Product', 'EL id del producto no es correcta. Favor de validar.');
      }
    } else {
      response = respApi.createSuccess(400, 'Product', 'All Data Product', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    console.log(response);

    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Product', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeProducts.get('/getList', async (req, resp) => {
  try {
    const list = await gProduct();
    let response;
    if (list) {
      response = respApi.getSuccess(100, 'Product', 'All Product', list);
    } else {
      response = respApi.createSuccess(400, 'Product', 'All Product', 'No existen actualmente productos registradas.');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Product', 'All Product', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

module.exports = routeProducts;
