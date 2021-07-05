const express = require('express');

const validate = require('../../../public/javascript/modules/validateData/validateProduct');

const nOffer = require('./create');
const eOffer = require('./edit');

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routeOffer = express.Router();

routeOffer.post('/new', async (req, resp) => {
  try {
    const object = req.body;
    let isValidBody = true;
    let isValidIdProduct = false;
    let response;
    if (object) {
      isValidIdProduct = validate.identificador(object.idProduct);
      object.offer.forEach((element) => {
        const isValid = validate.isValidOffer(element);
        if (!isValid) isValidBody = false;
      });
    }
    if (isValidBody && isValidIdProduct) {
      response = await nOffer(object);
      switch (response) {
        case 1:
          response = respApi.createSuccess(201, 'Offer', 'New', 'Oferta de producto creado exitosamente');
          break;
        case 2:
          response = respApi.createSuccess(400, 'Offer', 'New', 'Id de producto no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(500, 'Offer', 'New', 'Hubo un error al intentar guardar el inventario en el sistema.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, 'Offer', 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Offer', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeOffer.put('/edit', async (req, resp) => {
  try {
    const object = req.body;
    let isValidBody = true;
    let isValidIdProduct = false;
    let response;
    if (object) {
      isValidIdProduct = validate.identificador(object.idProduct);
      object.offer.forEach((element) => {
        const isValid = validate.isValidOffer(element);
        if (!isValid) isValidBody = false;
      });
    }
    if (isValidBody && isValidIdProduct) {
      response = await eOffer(object);
      switch (response) {
        case 1:
          response = respApi.createSuccess(201, 'Offer', 'Edit', 'Oferta de producto actualizado exitosamente');
          break;
        case 2:
          response = respApi.createSuccess(400, 'Offer', 'Edit', 'Id de producto no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(500, 'Offer', 'Edit', 'Hubo un error al intentar guardar la oferta en el sistema.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, 'Offer', 'Edit', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Offer', 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

module.exports = routeOffer;
