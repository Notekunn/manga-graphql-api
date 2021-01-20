const { buildSchema } = require('graphql');

module.exports = buildSchema(`
scalar Date
type AuthData {
    userId: ID!
    token: String!
}
type Category {
    _id: ID
    title: String!
    slug: String
    description: String
}
type Artist {
    _id: ID
    name: String!
    slug: String
    about: String
    coverUrl: String
}
enum Permission{
    admin,
    moderator,
    translator,
    member
}
type User {
    _id: ID
    userName: String!
    name: String
    mail: String!
    avatarUrl: String
    permission: Permission
    createdAt: Date
}
input UserFilter {
    _id: ID
    userName: String
    name: String
    mail: String    
    permission: Permission
}
input UserInput {
    userName: String!
    password: String!
    name: String
    email: String
}
type RootQuery {
    category(_id: ID): Category
    categories: [Category!]!
    user(filter: UserFilter): User
    users(filter: UserFilter): [User!]!
}
type RootMutation {
    createCategory(title: String, description: String): Category!
    register(userInput: UserInput): User!
    login(userInput: UserInput): AuthData!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)