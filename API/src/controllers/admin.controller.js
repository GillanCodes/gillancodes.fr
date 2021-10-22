let {isAdmin} = require('../../utils/permissionCheck.utils');

module.exports.home = (req, res) => {

   if (isAdmin(res.locals.user)){
      res.send("yo")
   } else {
       res.send("ntm")
   }

}