const express = require('express');
const router = express.Router();
let products = require('../data/products');

// Obtener todos los productos
router.get('/', (req, res) => {
  res.json(products);
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  let { id, name, price, category } = req.body;

  if (!id || !name || !price || !category) {
    return res.status(400).json({ message: 'Todos los campos son requeridos: id, name, price, category' });
  }

  // Convertir id y price a string
  id = String(id);
  price = String(price);

  const newProduct = { id, name, price, category };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Actualizar un producto por ID
router.put('/:id', (req, res) => {
  let { id, name, price, category } = req.body;

  if (!id || !name || !price || !category) {
    return res.status(400).json({ message: 'Todos los campos son requeridos: id, name, price, category' });
  }

  // Convertir id y price a string
  id = String(id);
  price = String(price);

  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

  product.name = name;
  product.price = price;
  product.category = category;

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

