const express=require('express');

const path=require('path');

const passport=require('passport');

const {developer,logOut}=require(path.join(__dirname,'..','Controller','Auth.controller'));

const AuthRoutes=express.Router();



AuthRoutes.get('/callback',passport.authenticate('google',{
    failureRedirect:'/failure',
    session:true
}),developer);

AuthRoutes.get('/login',passport.authenticate('google',{
    scope:['email']
    }));

AuthRoutes.get('/logout',logOut)

module.exports={
    AuthRoutes
}