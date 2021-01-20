const Category = require('../models/Category');
const utils = require('../utils');

exports.getAll = async function () {
    const categories = await Category.find({}).sort({ title: 1 }).exec();
    return categories
}
exports.create = async function (args) {
    const { title, description } = args;
    const slug = await utils.generateSlug(Category, title, null);
    const category = new Category({
        title,
        slug,
        description
    });
    return await category.save();
}
exports.get = async function ({ _id }) {
    const category = await Category.findById(_id).exec();
    return category;
}
exports.delete = async function (args) {
    const result = await Category.remove({ _id: args._id });
    return result;
}