const fs = require('fs');
const path = require('path');
const {  mergeResolvers } = require('graphql-tools');
const resolverFiles = ["user", "category"];
const dir = __dirname;
const registerResolvers = resolverFiles.map(file=> {
    const resolver = require(path.resolve(dir, `${file}.js`));
    return resolver;
})
console.log(mergeResolvers(registerResolvers))
module.exports = mergeResolvers(registerResolvers)

// module.exports = resolvers;