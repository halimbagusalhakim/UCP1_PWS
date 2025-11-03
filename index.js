const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT), () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}).catch((err) => {
    console.log(err);
});

app.get('/buku', async (req, res) => {
    try {
        const obat = await db.obat.findAll();
        res.send(obat);
    } catch (err) {
        res.send(err);
    }
});