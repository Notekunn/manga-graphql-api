const Artist = require('../../models/Artist');
const utils = require('../../utils');
const artistResolver = {
  RootQuery: {
    artist: async (parent, args, context, info) => {
      const artist = await Artist.findOne({ ...filter })
        .sort({ name: 1 })
        .exec();
      if (!artist) {
        throw new Error('Không tìm thấy tác giả');
      }
      return artist;
    },
    artists: (parent, args, context, info) => {
      const { filter = {} } = args;
      return Artist.find({ ...filter })
        .sort({ name: 1 })
        .exec();
    },
  },
  RootMutation: {
    createArtist: async (parent, args, context, info) => {
      if (!context.isAuthority) throw new Error('Bạn chưa đăng nhập');
      if (!context.user.isAuthority('moderator')) throw new Error('Bạn phải có quyền moderator');
      const { name, about, avatarUrl } = args.artistInput || {};
      const slug = await utils.generateSlug(Artist, name, null);
      const artist = new Artist({
        name,
        slug,
        about,
        avatarUrl,
      });
      await artist.save();
      return artist;
    },
    updateArtist: async (parent, args, context, info) => {
      if (!context.isAuthority) throw new Error('Bạn chưa đăng nhập');
      if (!context.user.isAuthority('moderator')) throw new Error('Bạn phải có quyền moderator');
      const { artistInput, _id } = args;
      if (artistInput.name)
        artistInput.slug = await utils.generateSlug(Artist, artistInput.name, null);
      const result = await Artist.findByIdAndUpdate(_id, { ...artistInput }, { new: true });
      return result;
    },
    deleteArtist: async (parent, args, context, info) => {
      if (!context.isAuthority) throw new Error('Bạn chưa đăng nhập');
      if (!context.user.isAuthority('moderator')) throw new Error('Bạn phải có quyền moderator');
      const { n: rowsDeleted } = await Artist.remove({ _id: args._id });
      return {
        success: true,
        rowsDeleted,
      };
    },
  },
};
module.exports = artistResolver;
