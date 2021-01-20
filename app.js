const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

app.use(express.json());
app.get('/', function (req, res) {
    res.send("Ahihi");
})
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const schema = require('./graphql/schema');
const root = require('./graphql/resolvers');

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(3000, function () {
    console.log("http://127.0.0.1:3000");
});