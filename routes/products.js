const express = require('express');
const router = express.Router();
let products = require('../data/products');

// Obtener todos los productos
router.get('/', (req, res) => {
  res.json(products);
});


const generateRandomId = () => Math.random().toString(36).substr(2, 9);
const generateRandomName = () => `Product-${Math.random().toString(36).substr(2, 5)}`;
const generateRandomPrice = () => (Math.random() * 100).toFixed(2);
const generateRandomCategory = () => `Category-${Math.random().toString(36).substr(2, 5)}`;

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

// Obtener un producto por ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(product);
});

// Actualizar un producto por ID
router.put('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Producto no encontrado' });

    const updatedProduct = {
        id: req.body.id || products[index].id,
        name: req.body.name || products[index].name,
        price: req.body.price || products[index].price,
        category: req.body.category || products[index].category,
    };

    products[index] = updatedProduct;
    res.json(updatedProduct);
});

// Eliminar un producto por ID
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Producto no encontrado' });

  products.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
