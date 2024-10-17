const express = require('express');
const db = require('./config/database');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

db.sequelize.sync().then(() => {
  console.log('Database synced');
});

app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});