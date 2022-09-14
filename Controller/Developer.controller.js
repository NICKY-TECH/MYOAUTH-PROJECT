const path=require('path');

const {user}=require(path.join(__dirname,'..','model','user.model'));

async function Developer (req,res){
        user.find({userId:req.user},{'_id':0},function(issue,outcome){
            if(issue){
    
            }
            else{
                if(outcome.userName){
                    res.render('about',{userInfo:outcome.userName});
                }
                else{
                    const userInfo=','
                    res.render('about',{userInfo});
                }
    
            }
        })
       
    
}

module.exports={
    Developer,
}