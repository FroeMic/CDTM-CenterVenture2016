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
        console.log("API Auth Request " + req.originalUrl + " from: " + JSON.stringify(req.session.user.displayName));
        next();
        return;
    }
    res.status(401).send('not authorized');
}

module.exports = {
    "loginRequired": userMiddleware,
    "sessionRequired": apiMiddleware,
};
