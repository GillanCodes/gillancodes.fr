module.exports.checkAdmin = async (req, res, next) => {
    res.locals.isAdmin = false
    if (res.locals.user) {
        const permissions = res.locals.user.permissions;
        if (permissions.includes('ADMIN')){
            res.locals.isAdmin = true; 
            next();   
        } else {
            res.locals.isAdmin = false;
            next();
        }
    } else {
        res.locals.isAdmin = false;
        next();
    }
    next();  
}