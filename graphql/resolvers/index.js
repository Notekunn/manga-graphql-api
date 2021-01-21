const categoryController = require('../../controllers/category');
const userController = require('../../controllers/user');
const artistController = require('../../controllers/artist');
module.exports = {
    ...userController,
    ...categoryController,
    ...artistController
}