module.exports = (sequelize, DataTypes) => {
  const Level = sequelize.define('Level', {
    name: DataTypes.STRING,
  }, {
    tableName: 't_level',
    timestamps: false,
  });
  return Level;
};