const Artist = require('../../models/Artist');
const utils = require('../../utils');
const artistResolver = {
    RootQuery: {
        artist: async (parent, args, context, info) => {
            const artist = await Artist.findOne({ ...filter }).sort({ name: 1 }).exec();
            if (!artist) {
                throw new Error('Không tìm thấy tác giả');
            }
            return artist;
        },
        artists: (parent, args, context, info) => {
            const { filter = {} } = args;
            return Artist.find({ ...filter }).sort({ name: 1 }).exec();
        },
    },
    RootMutation: {
        createArtist: async (parent, args, context, info) => {

        },
        updateArtist: async (parent, args, context, info) => { },
        deleteArtist: async (parent, args, context, info) => { }
    }
}
module.exports = artistResolver;