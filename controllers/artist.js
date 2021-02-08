const Artist = require('../models/Artist');
const utils = require('../utils');

exports.artists = async function ({ filter = {} }) {
  const artists = await Artist.find({ ...filter })
    .sort({ name: 1 })
    .exec();
  return artists;
};

exports.createArtist = async function (args) {
  const { name, about, avatarUrl } = args;
  const slug = await utils.generateSlug(Artist, name, null);
  const artist = new Artist({
    name,
    slug,
    about,
    avatarUrl,
  });
  await artist.save();
  return artist;
};
exports.artist = async function ({ filter = {} }) {
  const artist = await Artist.findOne({ ...filter })
    .sort({ name: 1 })
    .exec();
  if (!artist) {
    throw new Error('Không tìm thấy tác giả');
  }
  return artist;
};

exports.deleteArtist = async function (args) {
  const result = await Artist.remove({ _id: args._id });
  return result;
};
