

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
