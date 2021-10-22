module.exports.uploadUserPicErrors = (err) => {

    let errors = {format: "", size: ""};

    if (err.message.includes('invalid_type')){
        errors.format = "Invalide File Type";
    } 

    if (err.message.includes('max_size')){
        errors.format = "Invalide File Type";
    }

    return errors;
}


module.exports.loginUserErrors = (err) => {

    let errors = {username: "", password: ""};

    if (err.message.includes('incorrect password')){
        errors.password = "Wrong Password";
    } 

    if (err.message.includes('incorrect username')){
        errors.username = "Invalide Username";
    }

    return errors;

}