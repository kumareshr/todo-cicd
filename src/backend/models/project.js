module.exports = {
  getAll: function(con, callback) {
    con.query(`SELECT 
    projects.project_id, projects.project_name, projects.user_id, users.username 
    FROM projects INNER JOIN users ON projects.user_id = users.user_id`, callback)
  },

  getByUser: function(con, id, callback) {
    con.query(`SELECT projects.project_id, projects.project_name, projects.user_id, users.username
    FROM projects INNER JOIN users ON projects.user_id = users.user_id
    WHERE users.user_id='${id}'`, callback)
  },

  getByUserAndId: function(con, user_id, project_id, callback) {
    con.query(`SELECT projects.project_id, projects.project_name, projects.user_id, users.username
    FROM projects INNER JOIN users ON projects.user_id = users.user_id
    WHERE users.user_id=${user_id} AND projects.project_id=${project_id}`, callback)
  },

  create: function(con, id, data, callback) {
    
    con.query(`INSERT INTO projects SET 
      project_name = '${data.project_name}',
      user_id = '${id}'`,
      callback
    )
  },

  destroy: function(con, id, callback) {
    con.query(`DELETE FROM projects WHERE projects.project_id = '${id}'`, callback)
  },

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