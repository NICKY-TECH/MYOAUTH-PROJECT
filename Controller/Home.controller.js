const path=require('path');

async function Home(req,res){
        res.sendFile(path.join(__dirname,'..','Public','views','index.html'))
        }


        module.exports={
            Home
        }