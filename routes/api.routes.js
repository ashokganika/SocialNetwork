const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const feedRouter = require('./../component/feed/feed.route');
const authenticate = require('./../middlewares/authenticate');

router.use('/auth', authRouter);
router.use('/user', authenticate, userRouter);
router.use('/feed', authenticate, feedRouter);

module.exports = router;