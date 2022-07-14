const express = require('express');
const { Deta } = require('deta');
PORT = 5000;


const deta = Deta('b04ghhib_qnLL2hgukjak6tZU4buhV1FGTbFraH9E'); // configure your Deta project
const db = deta.Base('b04ghhib');  // access your DB


const app = express(); // instantiate express

app.use(express.json()) // for parsing application/json bodies


app.post('/users', async (req, res) => {
    const { name, age, hometown } = req.body;
    const toCreate = { name, age, hometown};
    const insertedUser = await db.put(toCreate); // put() will autogenerate a key for us
    res.status(201).json(insertedUser);
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await db.get(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({"message": "Usuario no encontrado"});
    }
    
});

//    app.get('/bucaredad/:age, async (req, res) => {
//        const { age } = req.params;
//        const { items } = await db.fetch({'age': age});
//        return items;
//    });

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, hometown } = req.body;
    const toPut = { key: id, name, age, hometown };
    const newItem = await db.put(toPut);
    return res.json(newItem)
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await db.delete(id);
    res.json({"message": "deleted"})
});

app.listen(
    PORT,
     () => 
     console.log(`Listening on http://localhost:${PORT}`));
