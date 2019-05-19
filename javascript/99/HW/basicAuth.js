module.exports = options => {
    return (req, res, next) => {
        if (req.headers.authorization) {
            let userNamePassword = req.headers.authorization.split(' ')[1];
            const buffer = Buffer.from(userNamePassword, 'base64');
            userNamePassword = buffer.toString().split(':');
            if (options.users[userNamePassword[0]] &&
                options.users[userNamePassword[0]] === userNamePassword[1]) {
                req.user = userNamePassword[0];
                next();
                return;
            }
        }
        res.setHeader('WWW-Authenticate', 'Basic realm=PCS App');
        res.status(401).end();
    };
};