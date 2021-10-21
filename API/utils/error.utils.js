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