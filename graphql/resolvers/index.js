const categoryController = require('../../controllers/category');
exports.categories = categoryController.getAll
exports.category = categoryController.get
exports.addCategory = categoryController.create;
