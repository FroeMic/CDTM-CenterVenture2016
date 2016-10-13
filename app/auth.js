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
    res.send(401, 'not authorized');
}

module.exports = {
    "loginRequired": userMiddleware,
    "sessionRequired": apiMiddleware,
};
