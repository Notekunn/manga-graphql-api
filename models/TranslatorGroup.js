const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TranslatorGroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: String,
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TranslatorGroup', TranslatorGroupSchema, 'translator_groups');
