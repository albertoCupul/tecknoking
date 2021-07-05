const express = require('express');

const mongoose = require('mongoose');
const db = require('./public/javascript/modules/mongoDB/connection/dbConection');

mongoose.set('useFindAndModify', false);

const dataDB = { ...db.ObjDbConection };

/* configurando modulo express */

const port = 3000;

/* importando modulos propios */

// /* const sessions = require('./modules/sessions'); */

const routeRules = require('./routes/Products/rules/main');
const routeLiterals = require('./routes/Products/literals/main');
const routeCategory = require('./routes/Products/category/main');
const routeProduct = require('./routes/Products/products/main');
const routeInventory = require('./routes/Products/inventory/main');
const routeOffer = require('./routes/Products/offer/main');

const routeUser = require('./routes/Users/user/main');
const routeAccess = require('./routes/Users/access/main');
const routeLogin = require('./routes/Users/login/main');

/* ejecutando modulo express */

const app = express();

/* añadiendo a express el entender Json */

app.use(express.json());

app.use('/rules', routeRules);
app.use('/literals', routeLiterals);
app.use('/category', routeCategory);
app.use('/product', routeProduct);
app.use('/inventory', routeInventory);
app.use('/offer', routeOffer);
app.use('/user', routeUser);
app.use('/usrAccess', routeAccess);
app.use('/login', routeLogin);

/* rutas para manejo de usuarios administradores */
try {
  mongoose.connect(dataDB.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: false,
    dbName: dataDB.databaseName,
    user: dataDB.userName,
    pass: dataDB.userPwd,
  });
  /* iniciando localhost */
  app.listen(port, () => {
    console.log(`Ejecutando servidor en puert ${port}`);
  });
} catch (e) {
  console.error(e.message);
  console.log('error to connect DB motor');
}
