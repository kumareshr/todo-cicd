module.exports = {
  getAll: function(con, callback) {
    con.query(`SELECT 
    tasks.task_id,
    tasks.archived,
    tasks.date, 
    tasks.project_id,
    tasks.task, 
    tasks.user_id, 
    projects.project_name, 
    users.username
    FROM tasks
    INNER JOIN users on tasks.user_id = users.user_id
    INNER JOIN projects on users.user_id = projects.user_id
    WHERE projects.project_id = tasks.project_id`, callback)
  },

  getById: function(con, id, callback) {
    con.query(`SELECT 
    tasks.task_id,
    tasks.archived,
    tasks.date, 
    tasks.project_id,
    tasks.task, 
    tasks.user_id, 
    projects.project_name, 
    users.username
    FROM tasks
    INNER JOIN users on tasks.user_id = users.user_id
    INNER JOIN projects on users.user_id = projects.user_id
    WHERE tasks.task_id=${id}`, callback)
  },

  create: function(con, data, callback) {
    
    con.query(
      `INSERT INTO tasks SET 
      archived = ${0},
      date = '${data.date}',
      project_id = ${data.project_id},
      task = '${data.task}',
      user_id = ${data.user_id}`,
      callback
    )
  },

  destroy: function(con, id, callback) {
    con.query(`DELETE FROM tasks WHERE tasks.task_id = '${id}'`, callback)
  },

  update: function(con, id, callback) {
    con.query(
      `UPDATE tasks SET 
      archived = 1
      WHERE tasks.task_id = '${id}'`,
      callback
    )
  },

}