const express = require('express');
const db = require('./config/database');
require('dotenv').config();

const app = express();

db.sequelize.sync().then(() => {
  console.log('Database synced');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});