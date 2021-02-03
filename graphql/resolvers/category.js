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
        updateCategory: async (parent, args, context, info) => {
            const { categoryInput, _id } = args;
            if (!context.isAuthority) throw new Error("Bạn chưa đăng nhập");
            if (!context.user.isAuthority('moderator')) throw new Error("Bạn phải có quyền moderator");
            if (categoryInput.title){
                categoryInput.slug = await utils.generateSlug(Category, categoryInput.title, null);
            }
            const category = await Category.findByIdAndUpdate(_id, { ...categoryInput }, { new: true });
            if (!category) throw new Error("Thể loại bạn chỉnh sửa không tồn tại");
            return category;
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