if(process.env.NODE_ENV!=="production"){
    require('dotenv').config();
}

const express=require('express');

const app=express();

const path=require('path');

const mongoSan=require('express-mongo-sanitize');

const {AuthRoutes}=require(path.join(__dirname,'.','Router','auth.router'));

const {developerRouter}=require(path.join(__dirname,'.','Router','developer.router'));

const {homeRouter}=require(path.join(__dirname,'.','Router','home.router'));


const helmet=require('helmet');

const session=require('express-session');


const mongoose=require('mongoose');

const {user}=require(path.join(__dirname,'.','model','user.model'));

const connector=`mongodb+srv://JUST:${process.env.KEY}@author.kqyvmeq.mongodb.net/Adatabase?retryWrites=true&w=majority`;

mongoose.connection.once('open',()=>{
    console.log('connected')
})

mongoose.connection.on('error',(error)=>{
    console.log(`error note: ${error}`)
})

mongoose.connect(connector,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const mongoStore=require('connect-mongodb-session')(session);

const {Strategy}=require('passport-google-oauth20');

const passport=require('passport');

const mongodbStore=new mongoStore({
    uri:connector,
    collection:'sessionContainer',

})

const sessionConfig={
    store:mongodbStore,
    name:'bg',
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        maxAge:7*24*60*60*1000,


    }
}

app.use(session(sessionConfig));



function verify(accessToken,refreshToken,profile,done){
    user.findOne({userId:profile.id},function(err,result){
        if(err){
            console.log(`an error:${err}`)
        }
        else{
            if(!result){
                new user({
                    userId:profile.id,
                    email:profile._json.email,
                    userName:profile.displayName
            
                }).save()

            }
            done(null,profile);
        }
    })
    

}

const options={
    callbackURL:'/auth/google/callback',
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
}


passport.use(new Strategy(options,verify));

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{

    done(null,id)
})



app.set('view engine','ejs');

app.set('views',(path.join(__dirname,'.','Public','views')));

app.use(helmet());

app.use(mongoSan());

app.use(express.static(path.join(__dirname,'.','Public')));

app.use(passport.initialize());

app.use(passport.session());

app.use(express.static(path.join(__dirname,'.','Public')));


app.use('/auth/google',AuthRoutes);

app.use('/developer',developerRouter);


app.use('/',homeRouter);





const PORT=process.env.PORT;

app.listen(PORT,()=>{
console.log(`server running at ${PORT}`);
});