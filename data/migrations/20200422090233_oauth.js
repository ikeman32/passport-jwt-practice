
exports.up = function(knex) {
  return knex.schema.createTable('oauth', tbl =>{
        tbl.increments();

        tbl.string('username')
            .notNullable()
            .unique()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('oauth');
};
