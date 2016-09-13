'use strict'

const express = require('express')
let router = express.Router();
// ref point #333
const pg = require('../db/knex_config.js')

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
