require('dotenv').config();
const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers');
const authMiddleware = require('./middleware/auth');
const expressPlayground = require('graphql-playground-middleware-express').default;
const { HOST = 'http://localhost', PORT = 3000 } = process.env;

process.env.NODE_ENV !== 'production' && app.use(morgan('dev'));
app.use(express.json());
app.use(authMiddleware);
app.get('/', function (req, res) {
  res.send('Ahihi');
});

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: makeExecutableSchema({
      typeDefs: graphQlSchema,
      resolvers: graphQlResolvers,
    }),
    // rootValue: graphQlResolvers,
    graphiql: true,
    pretty: true,
  }),
);

app.get(
  '/playground',
  expressPlayground({
    endpoint: '/graphql',
  }),
);

app.listen(PORT, function () {
  console.log(HOST + ':' + PORT);
});
