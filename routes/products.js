const express = require('express');
const router = express.Router();
let products = require('../data/products');

// Obtener todos los productos
router.get('/', (req, res) => {
  res.json(products);
});

// Crear un nuevo producto
router.post('/', (req, res) => {
    const { id, name, price, category } = req.body;

    if (!id || !name || !price || !category) {
        return res.status(400).json({ message: 'Por favor, proporcione id, name, price y category' });
    }

    const newProduct = { id, name, price, category };
    products.push(newProduct);
    res.status(201).json(newProduct);
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
