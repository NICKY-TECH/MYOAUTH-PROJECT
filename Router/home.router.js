const path=require('path');

const {Home}=require(path.join(__dirname,'..','Controller','Home.controller'));

const express=require('express');

const homeRouter=express.Router();

homeRouter.get('/',Home)

module.exports={
    homeRouter
}