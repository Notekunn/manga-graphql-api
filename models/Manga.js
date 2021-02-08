const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MangaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  otherName: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Đã hoàn thành', 'Đang tiến hành', 'Tạm ngưng', 'Đã hủy'],
    default: 'Đang tiến hành',
  },
  coverUrl: {
    type: String,
  },
  releasedYear: {
    type: String,
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  views: {
    type: Number,
    required: true,
    default: 0,
  },
  artists: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Artist',
    },
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
  ],
  groups: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'TranslatorGroup',
    },
  ],
});
module.exports = mongoose.model('Manga', MangaSchema);
