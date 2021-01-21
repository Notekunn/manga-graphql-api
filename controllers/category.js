const Category = require('../models/Category');
const utils = require('../utils');

exports.categories = function ({ filter = {} }) {
    return Category
        .find({ ...filter })
        .sort({ title: 1 })
        .exec();
}
exports.createCategory = async function ({ categoryInput = {} }) {
    const { title, description } = categoryInput;
    const slug = await utils.generateSlug(Category, title, null);
    const category = new Category({
        title,
        slug,
        description
    });
    return await category.save();
}
exports.category = async function ({ filter = {} }) {
    const category = await Category
        .findOne({ ...filter }).exec();
    return category;
}
exports.deleteCategory = async function (args) {
    const result = await Category.remove({ _id: args._id });
    return result;
}