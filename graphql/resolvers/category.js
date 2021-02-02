const Category = require("../../models/Category");
const utils = require('../../utils')
const categoryResolver = {
    RootQuery: {
        category: async (parent, args, context, info) => {
            const { filter = {} } = args;
            const category = await Category
                .findOne({ ...filter }).exec();
            return category;
        },
        categories: (parent, args, context, info) => {
            const { filter = {} } = args;
            return Category
                .find({ ...filter })
                .sort({ title: 1 })
                .exec();
        }
    },
    RootMutation: {
        createCategory: async (parent, args, context, info) => {
            const { categoryInput } = args;
            if (!context.isAuthority) throw new Error("Bạn chưa đăng nhập")
            if (!context.user.isAuthority('moderator')) throw new Error("Bạn phải có quyền moderator");
            const { title, description } = categoryInput;
            const slug = await utils.generateSlug(Category, title, null);
            const category = new Category({
                title,
                slug,
                description
            });
            return await category.save();
        },
        deleteCategory: async (parent, args, context, info) => {
            if (!context.isAuthority) throw new Error("Bạn chưa đăng nhập")
            if (!context.user.isAuthority('moderator')) throw new Error("Bạn phải có quyền moderator");
            const { n: rowsDeleted } = await Category.deleteOne({ _id: args._id });
            return {
                success: true,
                rowsDeleted
            };
        }
    }
}
module.exports = categoryResolver;