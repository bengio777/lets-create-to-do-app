'use strict'

const express = require('express')
let router = express.Router();
// ref point #333
const pg = require('../db/knex_config.js')
//ref point #555
router.post('/v1/items', (req,res,next)=> {
  //if the name is greater than 255 charecters, then dont do anything.
  let name = req.body.name;
  let description = req.body.name.description;

  if(name.length >255){
    res.redirect('/');
  }

  if(name.length >255){
    res.redirect('/');
  }
  next();
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

  // #777
  router.get('/v1/items/delete/:id', (req,res,next)=>{
    // console.log('the id is:',req.params.id);
    // res.json(req.params);
    pg('todo').where('id', req.params.id).del()
      .then(()=>{
        res.redirect('/');
      })
      .catch((error)=>{
        console.error('Error deleting row from DB');
        next(err);
      });
  });

  module.exports = router;
