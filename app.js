const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Routing v1');
});

app.get('/', (req, res) => {
    res.send('Endpoint funcional');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
