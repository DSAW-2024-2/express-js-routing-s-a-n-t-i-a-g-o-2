const express = require('express');
const router = express.Router();
let users = require('../data/users');

// Obtener todos los usuarios
router.get('/', (req, res) => {
  res.json(users);
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
});

// Actualizar un usuario por ID
router.put('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  Object.assign(user, req.body);  // Actualiza los campos enviados
  res.json(user);
});

// Eliminar un usuario por ID
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });

  users.splice(index, 1);
  res.status(204).send();  // 204 significa "No Content"
});

module.exports = router;
