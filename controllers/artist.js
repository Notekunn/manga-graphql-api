const Artist = require('../models/Artist');
const utils = require('../utils');

exports.getAll = async function () {
    const artists = await Artist.find({}).sort({ name: 1 }).exec();
    return artists;
}

exports.create = async function (args) {
    const { name, about, avatarUrl } = args;
    const slug = await utils.generateSlug(Artist, name, null);
    const artist = new Artist({
        name,
        slug,
        about,
        avatarUrl
    });
    await artist.save();
    return artist;
}
exports.get = async function (args) {
    const artist = await Artist.findById(args._id).exec();
    if (!artist) {
        throw new Error('Không tìm thấy tác giả');
    }
    return artist;
}

exports.delete = async function (args) {

    const result = await Artist.remove({ _id: args._id });
    return result;
}