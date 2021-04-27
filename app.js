require('dotenv').config();
const Express = require('express');
const database = require('./db');
const userController = require('./controllers/userController')
const log = require('./controllers/logController')

database.sync();
const app = Express();

app.use(require('./middleware/headers'));
app.use(Express.json());

app.use('/user', userController); //the variable here then goes to the file and looks for every route in that file
app.use('/log', log);


app.listen (process.env.PORT, () => console.log(`[${process.env.PORT}]: the app is listening`));

