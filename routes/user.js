const express = require ('express');
const { create , login , getAll , getById , edit , follow , unfollow } = require ('../controllers/user');

const router = express.Router();

router.post('/', async (req,res,next) =>{
    const { body } = req ;
    try {
        const user = await create( body) ;
        res.json(user);
    } catch (e) {
        next(e);
    }
});

router.post('/login', async (req,res,next) => {
    const { body } = req ;
    try {
        const user = await login(body);
        res.json(user);
    } catch (e) {
        next(e);
    }
})

router.get('/', async (req,res,next) => {
    try {
        const users = await getAll();
        res.json(users);
    } catch (e) {
        next(e);
    }
})

router.get('/:id', async (req,res,next) => {
    const {params : { id } } = req;
    try {
        const user = await getById(id);
        res.json(user);
    } catch (e) {
        next(e);
    }
})

router.patch('/:id', async (req,res,next) => {
    const {params : { id } , body } = req;
    try {
        const user = await edit(id,body);
        res.json(user);
    } catch (e) {
        next(e);
    }
})

router.post('/follow/:followingId', async (req,res,next) => {
    const {params : { followingId } , body : {_id} } = req;
    try {
        const user = await follow(followingId,_id);
        res.json(user);
    } catch (e) {
        next(e);
    }
})

router.post('/unfollow/:unfollowingId', async (req,res,next) => {
    const {params : { followingId } , body : {_id} } = req;
    try {
        const user = await unfollow(followingId,_id);
        res.json(user);
    } catch (e) {
        next(e);
    }
})

module.exports = router;