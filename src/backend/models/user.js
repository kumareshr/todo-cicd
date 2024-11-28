module.exports = {
  getAll: function(con, callback) {
    con.query("select * from users", callback)
  },

  getById: function(con, name, callback) {
    con.query(`SELECT * from users WHERE username = '${name}'`, callback)
  },

  // create: function(con, data, callback) {
    
  //   con.query(
  //     `INSERT INTO user_details SET 
  //     username = '${data.username}', 
  //     first_name = '${data.firstname}', 
  //     last_name = '${data.lastname}', 
  //     status = '1',
  //     gender = '${data.gender}',
  //     password = '${data.password}'`,
  //     callback
  //   )
  // },

  // destroy: function(con, name, callback) {
  //   con.query(`DELETE FROM user_details WHERE username = '${name}'`, callback)
  // },

  // update: function(con, data, name, callback) {
  //   con.query(
  //     `UPDATE user_details SET 
  //     username = '${data.username}', 
  //     first_name = '${data.firstname}', 
  //     last_name = '${data.lastname}', 
  //     status = ${data.status},
  //     gender = '${data.gender}',
  //     password = '${data.password}'
  //     WHERE username = '${name}'`,
  //     callback
  //   )
  // },

}