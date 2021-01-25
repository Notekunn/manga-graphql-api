const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.get('/', function (req, res) {
    res.send("Ahihi");
})

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers');

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    pretty: true,
}));

app.listen(PORT, function () {
    console.log("http://127.0.0.1:" + PORT);
});