module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
  }, {
    tableName: 'user',
    timestamps: false,
  });
  return User;
};

