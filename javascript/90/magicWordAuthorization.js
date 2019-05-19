module.exports = (req, res, next) => {
    if (req.query.magicWord !== 'please') {
        const err = new Error('You forgot to say please');
        err.statusCode = 401;
        next(err);
    }
    next();
};