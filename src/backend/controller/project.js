const projectData = require("../models/project");

module.exports = {
  getAll: function(req, res) {
    projectData.getAll(req.con, function(err, rows) {
      if (err) res.json({error: err});
      const data = rows ? (rows.map( row => {return {
        "project_id" : row["project_id"],
        "project_name" : row["project_name"],
        "user": {
          "user_id" : row["user_id"],
          "username" : row["username"]
        }
      } }) ) : ([]);
      res.json(data);
    })
    
  },
  getByUser: function(req, res) {
    projectData.getByUser(req.con, req.params.id, function(err, rows) {
      if (err) res.json({error: err});
      const data = rows ? (rows.map( row => {return {
        "project_id" : row["project_id"],
        "project_name" : row["project_name"],
        "user": {
          "user_id" : row["user_id"],
          "username" : row["username"]
        }
      } }) ) : ([]);
      res.json(data);
    })
    
  },

  getProjectID: function(req, res) {
    projectData.getByUserAndId(req.con, req.params.user_id, req.params.project_id, function(err, rows) {
      if (err) res.json({error: err});
      const row = rows[0];
      const data = row ?  {
        "project_id" : row["project_id"],
        "project_name" : row["project_name"],
        "user": {
          "user_id" : row["user_id"],
          "username" : row["username"]
        }
      } : ({});
      res.json(data);
    })
    
  },

  createProject: function(req, res) {
    projectData.create(req.con, req.params.id, req.body, function(err) {
      if (err) res.json({error: err});
      res.redirect("/")
    })
  },

  destroy: function(req, res) {
    projectData.destroy(req.con, req.params.id, function(err) {
      if (err) res.json({error: err});
      res.redirect("/")
    })
  },

  // update: function(req, res) {
  //   userData.update(req.con, req.query, req.params.id, function(err) {
  //     if (err) res.json({error: err});
  //     res.redirect(`/users/${req.query.username}`)
  //   })
  // },

};