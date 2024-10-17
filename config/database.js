const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/User')(sequelize, Sequelize);
db.Level = require('../models/Level')(sequelize, Sequelize);
db.Department = require('../models/Department')(sequelize, Sequelize);

db.Level.hasOne(db.User, { foreignKey: 'level_id' });
db.User.belongsTo(db.Level, { foreignKey: 'level_id' });

db.Department.hasMany(db.User, { foreignKey: 'department_id' });
db.User.belongsTo(db.Department, { foreignKey: 'department_id' });

module.exports = db;
