const categoryController = require('../../controllers/category');
const userController = require('../../controllers/user');
const artistController = require('../../controllers/artist');
const translatorGroupController = require('../../controllers/translator-group');
module.exports = {
    ...userController,
    ...categoryController,
    ...artistController,
    ...translatorGroupController
}