const express = require('express');
const router = express.Router();
let orders = require('../data/orders');
let users = require('../data/users');
let products = require('../data/products');

// Obtener todos los pedidos
router.get('/', (req, res) => {
  res.json(orders);
});

//Obtener pedido por ID
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });
  res.json(order);
});


// Crear un nuevo pedido
router.post('/', (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Verificar que todos los datos sean strings
  if (typeof userId !== 'string' || typeof productId !== 'string' || typeof quantity !== 'string' || quantity <= 0) {
    return res.status(400).json({ message: 'Verifique que userId, productId, y quantity sean strings' });
  }

  // Validar que el usuario y el producto existan
  const user = users.find(u => u.id === userId);
  const product = products.find(p => p.id === productId);

  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

  // Crear el nuevo pedido
  const newOrder = {
    id: `${orders.length + 1}`, // Generar id del pedido
    userId,
    productId,
    quantity,
    status: 'pendiente'
  };
  
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

module.exports = router;