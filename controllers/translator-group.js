const mongoose = require('mongoose');
const TranslatorGroup = require('../models/TranslatorGroup')
const User = mongoose.model('User')
const utils = require('../utils')

exports.getAll = async function (args) {
    const translators = await TranslatorGroup.find({}).populate([{
        path: 'manager',
        select: ['-password', '-__v']
    }, {
        path: 'members',
        select: ['-password', '-__v']
    }]).sort({ name: 1 }).exec();
    return translators;
}

exports.create = async function (args) {
    const { name, description, managerId } = args;
    const manager = await User.findById(managerId);
    if (!manager) throw new Error("Người dùng không tồn tại");
    if (!manager.isAuthority('moderator')) throw new Error("Bạn không đủ quyền tạo nhóm dịch");
    const slug = await utils.generateSlug(TranslatorGroup, name, null);
    const translatorGroup = new TranslatorGroup({
        name,
        slug,
        manager: manager._id,
        description,
    });
    await translatorGroup.save();
    return translatorGroup;

}
exports.get = async function (args) {
    const translator = await TranslatorGroup.findById(args._id).populate([{
        path: 'manager',
        select: ['-password', '-__v']
    }, {
        path: 'members',
        select: ['-password', '-__v']
    }]).exec();
    return translator;
}