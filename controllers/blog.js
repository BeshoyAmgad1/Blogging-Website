const Blog = require('../models/blog');
const create = (blog) => {
    return Blog.create(blog);
}

const getAll = () => Blog.find(query).exec();

const getById = (id) => Blog.findById(id).exec();

const edit = (id,body) => Blog.findByIdAndUpdate(id,body, {new : true}).exec();

const deleteOne = (id) => Blog.findByIdAndDelete(id).exec();

const findByTag = (tag) => Blog.find({tags : tag}).exec();

const findByTitle = (title) => Blog.find({title : title}).exec();

module.exports = {
    create , getAll , getById , edit , deleteOne , findByTag , findByTitle
}