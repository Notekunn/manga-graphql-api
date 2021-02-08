const slugify = require('slugify');
exports.generateSlug = async function generate(model, text, suffix) {
  const possibleText = text + (suffix ? '-' + suffix : '');
  const slug = slugify(possibleText, { lower: true, locale: 'vi' });
  const item = await model.findOne({ slug });
  if (item) return generate(model, text, (suffix || 0) + 1);
  return slug;
};
