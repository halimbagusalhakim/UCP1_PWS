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
        const buku = await db.buku.findAll();
        res.send(buku);
    } catch (err) {
        res.send(err);
    }
});

app.post('/buku', async (req, res) => {
    const data = req.body;
    try {
        const buku = await db.buku.create(data);
        res.send(buku);
    }catch (err) {
        res.send(err);
    }
});

app.put('/buku/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const buku = await db.buku.findByPk(id);
        if (!buku) {
            return res.status(404).send({ message: 'buku tidak ditemukan' });
        }

        await buku.update(data);
        res.send({message: 'buku berhasil diupdate', buku });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/buku/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const buku = await db.buku.findByPk(id);
        if (!buku) {
            return res.status(404).send({ message: 'buku tidak ditemukan' });
        }
        await buku.destroy();
        res.send({ message: 'buku berhasil dihapus' });
    } catch (err) {
        res.status(500).send(err);
    }
});

