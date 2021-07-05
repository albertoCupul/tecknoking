const express = require('express');

const validate = require('../../../public/javascript/modules/validateData/simpleValidate');

const nRule = require('./create');
const eRule = require('./edit');
const dRule = require('./delete');
const gaRule = require('./getAllInfo');
const glRule = require('./getList');
const arRule = require('./addRef');
const erRule = require('./editRef');

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routeRules = express.Router();

routeRules.post('/new', async (req, resp) => {
  try {
    const nameRule = req.body.name;
    let isValid = false;
    let response;
    if (nameRule) {
      isValid = validate.name(nameRule);
    }
    if (isValid) {
      response = await nRule.create(nameRule);
      if (response) {
        response = respApi.createSuccess(201, 'Rules', 'New', 'Regla creada exitosamente');
      } else {
        response = respApi.createSuccess(200, 'Rules', 'New', 'Ya existe una regla almacenada con ese nombre');
      }
    } else {
      response = respApi.createSuccess(400, 'Rules', 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Rules', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeRules.put('/edit', async (req, resp) => {
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
      response = await eRule.edit(idRule, newNameRule);
      if (response) {
        response = respApi.createSuccess(200, 'Rules', 'Edit', 'Regla actualizada exitosamente');
      } else {
        response = respApi.createSuccess(100, 'Rules', 'Edit', 'Ya existe una regla almacenada con ese nombre');
      }
    } else {
      response = respApi.createSuccess(400, 'Rules', 'Edit', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Rules', 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeRules.delete('/delete/:id', async (req, resp) => {
  try {
    const idRule = req.params.id;
    let isValid = false;
    let response;
    if (idRule) {
      isValid = validate.identificador(idRule);
    }
    if (isValid) {
      dRule.remove(idRule);
      response = respApi.createSuccess(100, 'Rules', 'Delete', 'Regla eliminada exitosamente');
    } else {
      response = respApi.createSuccess(400, 'Rules', 'Delete', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Rules', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeRules.get('/getAll/:id', async (req, resp) => {
  try {
    const idRule = req.params.id;
    let isValid = false;
    let response;
    if (idRule) {
      isValid = validate.identificador(idRule);
    }
    if (isValid) {
      const rule = await gaRule(idRule);
      if (rule) {
        response = respApi.getSuccess(100, 'Rules', 'All Data Rule', rule);
      } else {
        response = respApi.createSuccess(424, 'Rules', 'All Data Rule', 'EL id de la regla o literal no es correcta. Favor de validar.');
      }
    } else {
      response = respApi.createSuccess(400, 'Rules', 'All Data Rule', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Rules', 'All Data Rule', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeRules.get('/getList/', async (req, resp) => {
  try {
    const list = await glRule();
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

routeRules.post('/addRef', async (req, resp) => {
  try {
    const idRule = req.body.id;
    const { literals } = req.body;
    let isValidId = false;
    let response;
    if (idRule) {
      isValidId = validate.identificador(idRule);
    }
    if (isValidId) {
      response = await arRule(idRule, literals);
      if (response) {
        response = respApi.createSuccess(200, 'Rules', 'Add Literals Reference', 'Literales de regla actualizadas exitosamente.');
      } else {
        response = respApi.createSuccess(424, 'Rules', 'Add Literals Reference', 'EL id de la regla o literal no es correcta. Favor de validar.');
      }
    } else {
      response = respApi.createSuccess(400, 'Rules', 'Add Literals Reference', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Rules', 'Add Literals Reference', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeRules.put('/editRef', async (req, resp) => {
  try {
    const idRule = req.body.id;
    const { literals } = req.body;
    let isValidId = false;
    let response;
    if (idRule) {
      isValidId = validate.identificador(idRule);
    }
    if (isValidId) {
      response = await erRule.edit(idRule, literals);
      if (response) {
        response = respApi.createSuccess(100, 'Rules', 'Edit Literals Reference', 'Literales de regla actualizadas exitosamente.');
      } else {
        response = respApi.createSuccess(424, 'Rules', 'Edit Literals Reference', 'EL id de la regla o literal no es correcta. Favor de validar.');
      }
    } else {
      response = respApi.createSuccess(400, 'Rules', 'Edit Literals Reference', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Rules', 'Edit Literals Reference', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

module.exports = routeRules;
