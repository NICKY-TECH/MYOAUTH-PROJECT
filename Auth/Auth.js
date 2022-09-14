function authenticateMiddleware(req,res,next){
    const existingUser=req.user && req.isAuthenticated();
    if(!existingUser){
        res.redirect('/auth/google/login');
    }
    next();
}



module.exports={
    authenticateMiddleware
}