/**
 * Created by cwoebker on 12.10.16.
 */

function userMiddleware(req, res, next) {
    if (req.session.user) {
        next();
        return;
    }
    res.redirect('/');
}

function apiMiddleware(req, res, next) {
    if (req.session.user) {
        next();
        return;
    }
    res.status(401).send('not authorized');
}

module.exports = {
    "loginRequired": userMiddleware,
    "sessionRequired": apiMiddleware,
};
