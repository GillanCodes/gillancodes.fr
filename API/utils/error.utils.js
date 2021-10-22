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

module.exports.registerUserErrors = (err) => {

    let errors = {username: "", password: "", email:""};

    if (err.message.includes('username') && err.message.includes('shorter')){
        errors.username = "Nom d'utilisateur trop court !";
    } 

    if (err.message.includes('password') && err.message.includes('shorter')){
        errors.password = "Mot de passe inferieur a 8 caratère !";
    }
    
    if (err.message.includes('email') && err.message.includes('Validator')){
        errors.email = "Cet email n'est pas valide !";
    }


    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes("username")){
        errors.username = "Zut ! Ce nom d'utilisateur est deja pris !";
    }

    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes("email")){
        errors.email = "Zut ! Cet email est deja pris !";
    }

    return errors;

}