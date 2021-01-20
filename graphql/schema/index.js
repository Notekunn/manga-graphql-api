const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Category {
    _id: ID
    title: String
    slug: String
    description: String
}
type RootQuery {
    category(_id: ID!): Category
    categories: [Category!]!
}
type RootMutation {
    addCategory(title: String, description: String): Category!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)