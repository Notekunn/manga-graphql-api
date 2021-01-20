const categoryController = require('../../controllers/category');
const userController = require('../../controllers/user');
module.exports = {
    ...userController,
    ...categoryController
}