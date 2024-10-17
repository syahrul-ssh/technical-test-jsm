const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const db = require('../config/database');
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  const { username, password, level, department_id } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const department = await db.Department.findOne({ where: { id: department_id } });
  if (!department) {
    return res.status(404).send('Department not found');
  }
  try {
    const newLevel = await db.Level.create({ name: level });
    const level_id = newLevel.id;
    const user = await db.User.create({ username, password: hashedPassword, level_id, department_id });
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { username } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/logout', auth, (req, res) => {
  res.send('Logged out');
});

router.get('/', auth, async (req, res) => {
  const users = await db.User.findAll({ attributes: ['id', 'username'], include: [{model: db.Level}, {model: db.Department}] });
  res.json(users);
});

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const user = await db.User.findOne({ where: { id }, attributes: ['id', 'username'], include: [{model: db.Level}, {model: db.Department}] });
  res.json(user);
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { username, level, password, department_id } = req.body;
  const department = await db.Department.findOne({ where: { id: department_id } });
  if (!department) {
    return res.status(404).send('Department not found');
  }
  const exsistingUsers = await db.User.findOne({ where: { id }, include: [{model: db.Level}, {model: db.Department}] });
  const hashedPassword = password ? bcrypt.hashSync(password, 8) : exsistingUsers.password;
  try {
    if (level) {
      await db.Level.update({name: level}, { where: { id: exsistingUsers.level_id } });
    }
    await exsistingUsers.update(
      { username, password: hashedPassword, department_id },
      { where: { id } }
    );
    res.json(await db.User.findOne({ attributes: ['id', 'username'], where: { id }, include: [{model: db.Level}, {model: db.Department}] }));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await db.User.destroy({ where: { id } });
    res.send('User deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
