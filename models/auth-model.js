const db = require('../data/dbconfig');

const tblUsers = 'users';//define the users table name

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db(tblUsers).select('id', 'username');
}

function findBy(filter) {
  return db(tblUsers).where(filter);
}

async function add(user) {
  const [id] = await db(tblUsers).insert(user);

  return findById(id);
}

function findById(id) {
  return db(tblUsers)
    .where({ id })
    .first();
}