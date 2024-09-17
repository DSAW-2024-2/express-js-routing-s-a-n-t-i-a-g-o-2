const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Routing v1');
});

module.exports = app;

app.get('/', (req, res) => {
    res.send('Endpoint funcional');
});

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
