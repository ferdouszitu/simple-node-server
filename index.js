const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Simple node server is running');
});

app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'Sabana', email: 'sabana@gmail.com' },
    { id: 2, name: 'Sabnur', email: 'sabnur@gmail.com' },
    { id: 3, name: 'Sabila', email: 'sabila@gmail.com' }
];
// username: dbuser1
// password: Tkz1ePdVWG7sgmzK
// my ip: 103.141.71.103/32


const uri = "mongodb+srv://dbuser1:Tkz1ePdVWG7sgmzK@cluster0.nltgplc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        // const user = { name: 'Nahia Mahi', email: 'nehi@gmail.com' }
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            // users.push(user);
            // console.log(user);
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        });
    }

    finally {

    }
}

run().catch(err => console.log(err));

// app.get('/users' , (req, res) => {
//     if (req.query.name) {
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search));
//         res.send(filtered);
//     }
//     else {
//         res.send(users);
//     }
// });
// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user);
//     res.send(user);
// });

app.listen(port, () => {
    console.log(`Simple node server is running on port ${port}`);
})