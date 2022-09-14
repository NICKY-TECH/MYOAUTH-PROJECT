const express=require('express');

const path=require('path');

const {authenticateMiddleware}=require(path.join(__dirname,'..','Auth','Auth'));

const {Developer}=require(path.join(__dirname,'..','Controller','Developer.controller'));

const developerRouter=express.Router();

developerRouter.get('/info',authenticateMiddleware,Developer);


module.exports={
    developerRouter
}