$ mkdir <dirName>
$ cd <dirName>
$ touch app.js
$ touch package.json
$ npm init -y
$ express --hbs --git
$ npm install

###Open Atom

### put .env in your .gitignore file.

$ touch .env
$ npm install dotenv --save

###Create Heroku app

$ heroku create <applicationName>
$ git push heroku master

##Now you can check off your first item on your todo list!
  --basic Express Server on Heroku

#Next step, provision database with postgreSQL

### To check if you have postgeSQL installed:

$ psql

### Now, create a database

$ createdb demo_todo

### to check if knex is indeed installed.

$ knex

### Now, install knex and postgres

$ npm -i -S knex
$ npm -i -S pg

### Create your knexfile.js

$ knex init

## Now, go to your knex.js file

###Edit your knexfile.js

  --set your Development client to:
    -- postgresql

  --set your development connection to:
    --database : 'demo_todo'    (this is just the name of the db you created)

  --we arent going to use staging so you can just comment that out or delete it

  --set your connection to:
    -- process.env.DATABASE_URL

###Next Step, Make a migration

$ knex migrate:make todo

###You will notice a migrations directory has appeared

###Now we create the table with our migrate schema builder.
  --find this in the knex docs
  -- knexjs.org
  -- http://knexjs.org/#Schema-createTable
  -- copy and pasted the createTable schema builder.
  -- we need to return a promise so put "return" before pasting in code from schema-createTable

  -- Should look like this:

    exports.up = function(knex, Promise) {
    return knex.schema.createTable('todo', function (table) {
    table.increments();
    table.string('name');
    table.string('description');
  })
  };

  -- Edit the exports.down
  -- Should match above with parameters and function name.
  -- Should look like this:

    exports.down = function(knex, Promise) {
    return knex.schema.dropTable('todo')
  };

##Back to the terminal for migrate:latest

$ knex migrate:latest

##Not without a bit of debugging!
##Check your databaseName in knexfile.js!
##feels good to get better at the debugging process!

##Back to work!

##Now, you want to check your table to see if things are as you would expect.

$ psql demo_todo

###Now you are in postgres

demo_todo=# \dt
  --this will display database table

demo_todo=# \d todo
  -- this will display the todo migration

##Now, you need to do a rollback. Why? Because there is something we left unfinished in the todo migration file.

$ knex migrate:rollback

##In this example, we didnt change anything at this time, however, so again:

$ knex migrate:latest

##Time to add in DB to heroku as well.

  -You can find out where to do this by going to:
    -- https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database

    --you want this:
    -- heroku addons:create heroku-postgresql:hobby-dev

$ heroku addons:create heroku-postgresql:hobby-dev

##You will see a happy lil message that reads something like:
  --Database has been created and is available

## Do a git status to see where you are:

$ git status

$ git add .
$ git status
$ git commit -m 'set up knex and postgres'
$ git push

$ git push heroku master

##Its probably a good idea to use the heroku help command

$ heroku -h run

$ heroku run knex migrate:latest
$ heroku pg:psql

$ \d todo


##Time  to make your seeds
 --knex seed:make <tableName>

$ knex seed:make todo

##In your todo table file change 'table_name' to the name of your table/file

a)   return knex('table_name').del()

b)   return knex('todo').del()

## Then change the table_name for all the seed entries
## Then input your own data for the seed entries.

----------

  exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('todo').del()
      .then(function () {
        return Promise.all([
          // Inserts seed entries
          knex('todo').insert({
            name: 'My first todo item!',
            description: 'This item rocks',
          }),
          knex('todo').insert({
            name: 'Prepare for winter.',
            description: 'It is coming',
          }),
          knex('todo').insert({
            name: 'Catch some feelings!',
            description: 'Maybe after Galvanize',
          })
        ]);
      });
  };

----------

##Now access the knex help menu to figure out what you want to do.
$ knex -h

##Seed run is what you want to do

$ knex seed:run

##Check out your table in your Database

$ psql demo_todo
  --access demo_todo database

demo_todo=# \dt

###Should show:

List of relations
 Schema |         Name         | Type  |  Owner
--------+----------------------+-------+----------
 public | knex_migrations      | table | benjamin
 public | knex_migrations_lock | table | benjamin
 public | todo                 | table | benjamin
(3 rows)

##Now check out your todo table in your table in the database:

  --REMEMBER. Your psql command wont run unless you indlude a semicolon at the end!!!

demo_todo=# TABLE todo;

###Should look like this:

    demo_todo=# TABLE todo;
     id |         name         |      description
    ----+----------------------+-----------------------
      2 | My first todo item!  | This item rocks
      1 | Prepare for winter.  | It is coming
      3 | Catch some feelings! | Maybe after Galvanize
    (3 rows)


#Now that you are sure your table is displaying as you want it to be Push To Github!
  --dont forget to exit out of table \q

$ git status
$ git add .
$ git commit -m 'messagehere'
$ git push

##Next time going through this process be more conscious of adding commit names more specific like 'seeds added'

##Now get to work on create basic html in route/index.js

#Now you want to configure a GET with knex.

##routes/index.js will initially look like this:

-------
      var express = require('express');
      var router = express.Router();

      /* GET home page. */
      router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
      });

      module.exports = router;
-------

##Time to configure it for GET request with knex:

##go to terminal

$ mkdir db

##Inside make file

$ touch db/knex_config.js

##What do we need to do in this file?
  --go to knexjs documentation.


##You need to require in knex:
  --from the documentation under the:
  -- Initializing the Library
  --You will want to use the following template to format:

------
    var pg = require('knex')({
      client: 'pg',
      connection: process.env.PG_CONNECTION_STRING,
      searchPath: 'knex,public'
    });
------

##You will want what you enter in to should look something like this to start!

------

    var pg = require('knex')({
      client: 'pg',
      connection: process.env.PG_CONNECTION_STRING,
      searchPath: 'knex,public'
    });

------

##So we have pg now.
##So now we have to figure out how to all upon it to do my things.

##At the bottom of the file build a module.exports=pg;

!!!Comment #111 as a referent point!!!
#Now go to routes/index.js
--now require in your db/knex_config.js file

#Now we want to run a test for our router.get function. So we are going to comment out a line:

------
    router.get('/', function(req, res, next) {
//      res.render('index', { title: 'Express' });
    });
------

##Run test.
##You can figure out where to get the test template you need from knex.js docs:
##Your test should look something like this. Remember some of your psql commands might change in different situations but use this template to find your points of reference within the docs.

------
    router.get('/', function(req, res, next) {
      // res.render('index', { title: 'Express' });
      pg.select().table('todo').then((rows) => {
        console.log(rows);
        res.json(rows);
      })
      .catch((err) => {
        console.log("Error getting from database!!!");
        next(err);
      })
    });
------

#Use nodemon to check things our on your local server.

##On your localhost:#### you should see something like this:

------
    [
      {
        id: 2,
        name: "My first todo item!",
        description: "This item rocks"
      },
      {
        id: 1,
        name: "Prepare for winter.",
        description: "It is coming"
      },
      {
        id: 3,
        name: "Catch some feelings!",
        description: "Maybe after Galvanize"
      }
    ]
-------

##If you want this to work on Heroku you need to add the string:
  -- 'use strict';
to the top of these files:
  -- index.js
  -- knex_config.js

##Now that we know things are working we can comment out our first console.log in our index.js file and the res.json(rows) part.

##Where it was we do a:
  -- res.render and send it an object with a key of our choosing
  -- in this case we call the object key 'items' with a value of 'rows'.

###It should look something like this:

-------
    router.get('/', function(req, res, next) {
      // res.render('index', { title: 'Express' });
      pg.select().table('todo')
        .then((rows) => {
        // console.log(rows);
        // res.json(rows);
        res.render('index', {items: rows})
      })
-------

##Then, we need to open up our index.hbs in views directory.
  --Delete the contents

##Now fill with your own contents:

##
--we created an h1
-- an unordered list

##We are going to use helpers with our unordered list.

##GOOD. Everything is Working!
##Do a git push!

$ git status
$ git add .
$ git commit -m 'get-request and rendering html'
$ git push

##Do you remember how to push to heroku?

$ git push heroku master

##Now you are going to want to build an HTML form with your buttons continuing in your index.hbs.
  --fill out your form template

###Should look something like this:

-------
    <form class="add-item" action="/api/v1/items" method="post">
-------

###Continue filling out form
  --add labels
  --add inputs

###Should look something like this:
_______

<form class="add-item" action="/api/v1/items" method="post">
    <div>
      <label for="item-name">What do you need to do?</label>
      <input type="text" name="name" value="">
  </div>
  <div>
    <label for="item-description">Tell Me More</label>
    <textarea name="description" rows="8" cols="40"></textarea>
  </div>
</form>
_______

#Now run nodemon and check out the progress on your page!

##If everything is running push to git!
###You know the procedure!

##Its time to set up a button
  -- <input type="submit">


#Go to app.js and lets create another route
  --put 'use strict' on top of app.js file.

##Reference point #222 in app.js
  -- const api = require('/api/index.js')
Now, What do you need to do now since you added the require variable?
  --Add the app.use below in the app.js file.
    -- app.use('/api', api);

##Now we need to make a directory called API and a file within called index.js

$ mkdir api
$ touch api/index.js

##Go to your index.js file in your api directory.
  -- add 'use strict'

##Start filling out file from scratch
  --run a test to make sure things are working


##File should look something like this:
----------
    'use strict'

    const express = require('express')
    let router = express.Router();

    //('/v1/items') corresponds to the form action in index.hbs
    router.post('/v1/items', (req,res,next)=>{
      res.json(req.body);
    });
----------

##dont forget module.exports!
  --module.exports = router;

##Now go to your localhost page and test by entering a random string of anything. You should see something like this:

--------
    {
    name: "slkfjhg",
    description: "aslkdjfh"
    }
--------

##That means your test is working!

##So what is happening? We are grabbing information from our API and we need to insert into our database!

##Go back your your index.js file in api directory and create pg variable to require in your knex file from your db directory:
  --//ref point #333 in api/index.js

  -- const pg = require('../db/knex_config.js')

##Now we want to do a knex pg().insert.
  --What should we do?
  --We should probably go to the documentation at knexjs to figure out how our this works.

  --This gives us an idea of a template structure to work off:
    -- knex('books').insert({title: 'Slaughterhouse Five'})

    --comment out or delete your res.json(req.body) line
    --edit your api/index.js file accordingly and add info referenced from above

    --Should look kinda like this:

      -------
            pg('todo').insert(req.body);
      -------

##Add some middleware
  --ref point #444

##Code in api/index.js should now look something kinda like this:

-------
    router.post('/v1/items', (req,res,next)=>{
      // res.json(req.body);
      pg('todo').insert(req.body);
      //#444
      .then((something)=>{
        res.redirect('/')
      })
      .catch((error) => {
        next(err);
      })
    });
-------

##Now go test the code and the PUT request should work rendering a new todo item and description below it on the page.

##Your test passed! Now what do you do?

  -- go back to your api/index.js file and comment out or delete your console.log and change the function name 'something' after .then to empty string.

  --test again.

##Still works? Then, time to git push!
