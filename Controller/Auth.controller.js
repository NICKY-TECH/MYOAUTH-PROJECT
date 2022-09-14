async function logOut (req,res){
    req.logout((error)=>{
        if(error){
            console.log(`logout:${error}`)
        }
        else{
            res.clearCookie('bg');
            res.redirect('/')
        }
    });
}
async function developer (req,res){
        
        res.redirect('/developer/info')
}



module.exports={
    developer,
    logOut,

}