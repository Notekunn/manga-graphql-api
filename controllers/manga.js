const Manga = require('../models/Manga');
const utils = require('../utils');
exports.getAll = async function () {
    const mangas = await Manga.find({})
        .populate(['artists', 'groups', 'categories'])
        .sort({ lastUpdated: 1 }).exec();
    return mangas;
}

exports.create = async function (args) {
    const { name, otherName, description, status, coverUrl, releasedYear, artists, categories, groups } = args;
    const slug = await utils.generateSlug(Manga, name, null);
    const manga = new Manga({
        name, slug, otherName, description,
        status, coverUrl, releasedYear, artists,
        categories, groups
    });
    await manga.save();
    return manga;
}