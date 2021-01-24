const express = require ('express');
const {create , getAll , getById , edit , deleteOne , findByTag , findByTitle} = require ('../controllers/blog');

const router = express.Router();

router.post('/' , async (req,res,next) =>{
    const {body , user : {id} } = req ;
    try {
        const blog = await create ({ ...body, userId: user.id});
        res.json(blog);
    } catch (e) {
        next(e);
    }
})

router.get('/', async (req,res,next) => {
    const {user : {id}} = req;
    try {
        const blogs = await getAll({userId: id});
        res.json(blogs);
    } catch (e) {
        next(e);
    }
})

router.get('/:id', async (req,res,next) => {
    const {params : { id } } = req;
    try {
        const blog = await getById(id);
        res.json(blog);
    } catch (e) {
        next(e);
    }
})

router.patch('/:id',async (req,res,next) => {
    const {params : { id } , body } = req;
    try {
        const blog = await edit(id,body);
        res.json(blog);
    } catch (e) {
        next(e);
    }
})

router.delete('/:id', async (req,res,next) => {
    const {params : { id } } = req;
    try {
        const blog = await deleteOne(id);
        res.json(blog);
    } catch (e) {
        next(e);
    }
})

router.get('/tag/:tag', async (req,res,next) => {
    const {params:{tag}} = req;
    try {
        const blog = await findByTag(tag);
        res.json(blog);
    } catch (e){
        next (e);
    }
})

router.get('/title/:title', async (req,res,next) => {
    const {params:{title}} = req;
    try {
        const blog = await findByTitle(title);
        res.json(blog);
    } catch (e){
        next (e);
    }
})

module.exports = router;