const { buildSchema } = require('graphql');
const gql = require('graphql-tag');
const fs = require('fs');
const path = require('path');
const { mergeTypeDefs } = require('graphql-tools');
const schemaFiles = ['user', 'artist', 'translator-group', 'category', 'schema'];
const dir = __dirname;
const registerTypes = schemaFiles.map((file) => {
  const schemaString = fs.readFileSync(path.resolve(dir, `${file}.graphql`), 'utf8');
  return gql(schemaString);
});
module.exports = mergeTypeDefs(registerTypes);
