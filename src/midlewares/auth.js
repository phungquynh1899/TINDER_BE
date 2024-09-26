const authFunction =  (req, res, next) => {
    console.log('tôi là midleware của /admin');
    // bắt đầu xác thực
    const token = "xyz7";
    const isAdminAuthorized = token === "xyz";
   
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
    }
}

module.exports = {authFunction: authFunction}

