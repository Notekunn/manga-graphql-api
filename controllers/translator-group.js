const mongoose = require('mongoose');
const TranslatorGroup = require('../models/TranslatorGroup');
const User = mongoose.model('User');
const utils = require('../utils');

exports.translatorGroups = async function ({ filter = {} }) {
  const translators = await TranslatorGroup.find({ ...filter })
    .populate([
      {
        path: 'manager',
        select: ['-password', '-__v'],
      },
      {
        path: 'members',
        select: ['-password', '-__v'],
      },
    ])
    .sort({ name: 1 })
    .exec();
  return translators;
};
exports.translatorGroup = async function ({ filter = {} }) {
  const translator = await TranslatorGroup.findOne({ ...filter })
    .populate([
      {
        path: 'manager',
        select: ['-password', '-__v'],
      },
      {
        path: 'members',
        select: ['-password', '-__v'],
      },
    ])
    .exec();
  return translator;
};
exports.create = async function ({ translatorGroupInput = {} }) {
  const { name, description, managerId } = translatorGroupInput;
  const manager = await User.findById(managerId);
  if (!manager) throw new Error('Người dùng không tồn tại');
  if (!manager.isAuthority('moderator')) throw new Error('Bạn không đủ quyền tạo nhóm dịch');
  const slug = await utils.generateSlug(TranslatorGroup, name, null);
  const translatorGroup = new TranslatorGroup({
    name,
    slug,
    manager: manager._id,
    description,
  });
  await translatorGroup.save();
  return translatorGroup;
};
