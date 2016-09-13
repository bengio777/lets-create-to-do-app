'use strict'

const express = require('express')
let router = express.Router();
// ref point #333
const pg = require('../db/knex_config.js')
//ref point #555
router.post('/v1/items', (req,res,next)=> {
  //if the name is greater than 255 charecters, then dont do anything.
  let name = req.body.name;
  let name = req.body.name.description;

  if(name.length >255){
    res.redirect('/');
  }

  if(name.length >255){
    res.redirect('/');
})


//('/v1/items') corresponds to the form action in index.hbs
router.post('/v1/items', (req,res,next)=>{
  // res.json(req.body);
  //#444
  pg('todo').insert(req.body)
  .then(()=>{
    // console.log(something);
    res.redirect('/')
  })
  .catch((error) => {
    next(err);
  })
});

  module.exports = router;
