module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING,
  }, {
    tableName: 't_department',
    timestamps: false,
  });
  return Department;
};