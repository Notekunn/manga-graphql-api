const { buildSchema } = require('graphql');

module.exports = buildSchema(`
scalar Date
type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Date!
}
type DeleteResult{
    success: Boolean!
    rowsDeleted: Int
}
type Category {
    _id: ID
    title: String!
    slug: String
    description: String
}
input CategoryFilter{    
    _id: ID
    title: String
    slug: String
}
input CategoryInput{    
    title: String!
    description: String
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
    email: String!
    avatarUrl: String
    permission: Permission
    createdAt: Date
}
input UserFilter {
    _id: ID
    userName: String
    name: String
    email: String    
    permission: Permission
}
input UserInput {
    userName: String!
    password: String!
    name: String
    email: String
}
input UserLoginInput{
    userName: String!
    password: String!
}
input UserChangesInput{
    userName: String
    password: String
    name: String
    email: String
    avatarUrl: String
    permission: Permission
}
type Artist {
    _id: ID
    name: String!
    slug: String
    about: String
    coverUrl: String
}
input ArtistFilter {
    _id: ID
    name: String
    slug: String
}
input ArtistInput {
    name: String
    about: String
    coverUrl: String
}
type TranslatorGroup {
    _id: ID
    name: String
    description: String
    members: [User!]!
    manager: User!
    createdAt: Date
}
input TranslatorGroupFilter {
    _id: ID
    name: String
    manager: ID
}
type RootQuery {
    category(filter: CategoryFilter): Category
    categories(filter: CategoryFilter): [Category!]!
    user(filter: UserFilter): User
    me: User
    users(filter: UserFilter): [User!]!
    artist(filter: ArtistFilter): Artist
    artists(filter: ArtistFilter): [Artist!]!
    translatorGroup(filter: TranslatorGroupFilter): TranslatorGroup
    translatorGroups(filter: TranslatorGroupFilter): [TranslatorGroup!]!
}
type RootMutation {
    createCategory(categoryInput: CategoryInput!): Category!
    register(userInput: UserInput!): User!
    login(userInput: UserLoginInput!): AuthData!
    updateUser(_id: ID!, userInput: UserChangesInput!): User
    deleteUser(_id: ID!): DeleteResult!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)