module.exports.isAdmin = (user) => {
    if (user) {
        if (user.permissions.includes('ADMIN')){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}