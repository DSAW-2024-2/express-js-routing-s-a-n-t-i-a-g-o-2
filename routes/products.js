const express = require('express');
const router = express.Router();
let products = require('../data/products');

const generateRandomId = () => Math.random().toString(36).substr(2, 9);
const generateRandomName = () => `Product-${Math.random().toString(36).substr(2, 5)}`;
const generateRandomPrice = () => (Math.random() * 100).toFixed(2);
const generateRandomCategory = () => `Category-${Math.random().toString(36).substr(2, 5)}`;


// Obtener todos los productos
router.get('/', (req, res) => {
  res.json(products);
});

router.post('/', (req, res) => {
    const newProduct = {
        id: generateRandomId(),
        name: generateRandomName(),
        price: generateRandomPrice(),
        category: generateRandomCategory(),
        ...req.body
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});


// Actualizar un producto por ID
router.put('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

  product.name = generateRandomName();
  product.price = generateRandomPrice();
  product.category = generateRandomCategory();
  
  res.json(product);
});

// Eliminar un producto por ID
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Producto no encontrado' });

  products.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
