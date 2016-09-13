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
