const Chapter = require('../models/Chapter');

exports.getAll = async function () {
  const chapters = await Chapter.find({})
    .populate([
      {
        path: 'manga',
        select: '_id name slug description',
      },
      {
        path: 'group',
        select: '_id name slug description',
      },
      {
        path: 'translator',
        select: '_id name userName email permission',
      },
    ])
    .select('-__v')
    .sort({ lastUpdated: -1 })
    .exec();
  return chapters;
};

exports.create = async function (args) {
  const { chapter: chapterName, name, mangaId, groupId, translatorId, content } = args;
  const chapter = new Chapter({
    chapter: chapterName,
    name,
    manga: mangaId,
    group: groupId,
    translator: translatorId,
    content: content,
  });
  await chapter.save();
  return chapter;
};
