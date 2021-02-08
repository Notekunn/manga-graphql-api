const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  about: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
});

module.exports = mongoose.model('Artist', ArtistSchema);
