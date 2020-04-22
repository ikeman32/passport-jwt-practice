
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl =>{
        tbl.increments();
        tbl.string("fullName").notNullable();
		tbl
			.string("emailAddress")
			.notNullable()
			.unique();
		tbl.string("password");
		tbl.string("image");
		tbl.string("googleID").unique();
		tbl.string("facebookID").unique();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
