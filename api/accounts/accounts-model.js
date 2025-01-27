
const db = require('../../data/db-config') //importing in all the data, the door to the database


const getAll = () => {
  // select * from accounts;
  return db('accounts')
}

const getById = id => {
  // select * from accounts where id = 1;
  return db('accounts').where('id', id).first()
}

const create = async account => {
  // insert into accounts (name, budget) values ('foo', 1000);
  const [id] = await db('accounts').insert(account)
  return getById(id)
  //we are taking in the 'account' from the router
  //then we are awaiting the creation of the new account
  //this only retruns the id, so then we are runing 
  //getById again so that id can return what it needs 
  //to
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db('accounts').where('id', id).update(account)
  return getById(id)
}

const deleteById = id => {
  //delete from accounts where id = 1;
  return db('accounts').where('id', id).del() //returns the num of del records

}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
