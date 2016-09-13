'use strict'

var express = require('express');
var router = express.Router();
// #111
const pg = require('../db/knex_config.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  pg.select().table('todo')
    .then((rows) => {
    // console.log(rows);
    // res.json(rows);
    res.render('index', {items: rows})
  })
  .catch((err) => {
    console.log("Error getting from database!!!");
    next(err);
  })
});

module.exports = router;
