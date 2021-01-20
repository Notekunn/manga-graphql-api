const Category = require('../models/Category');
const utils = require('../utils');

exports.categories = function () {
    return Category
        .find({})
        .sort({ title: 1 })
        .exec();
}
exports.createCategory = async function (args) {
    const { title, description } = args;
    const slug = await utils.generateSlug(Category, title, null);
    const category = new Category({
        title,
        slug,
        description
    });
    return await category.save();
}
exports.category = async function ({ _id }) {
    const category = await Category.findById(_id).exec();
    return category;
}
exports.deleteCategory = async function (args) {
    const result = await Category.remove({ _id: args._id });
    return result;
}