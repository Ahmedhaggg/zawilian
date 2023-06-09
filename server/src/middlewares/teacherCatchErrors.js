module.exports = (controller, errorContainerName) => (req, res, next) =>
    Promise.resolve(controller(req, res, next))
        .catch((err) => {
            req.flash(errorContainerName, err);
            backURL = req.header('Referer') || '/';
            res.redirect(backURL);
        })