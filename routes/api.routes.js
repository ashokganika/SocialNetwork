const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const feedRouter = require('./../component/feed/feed.route');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/feed', feedRouter);

module.exports = router;