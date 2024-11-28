const projectData = require("../models/task");

module.exports = {
  getAll: function(req, res) {
    projectData.getAll(req.con, function(err, rows) {
      if (err) res.json({error: err});
      const data = rows ? (rows.map( row => {
        return {
          "task_id": row["task_id"],
          "archived": (row["archived"] === 0) ? false : true,
          "date": row["date"],
          "task": row["task"],
          "project": {
            "project_id": row["project_id"],
            "project_name": row["project_name"],
            "user": {
              "user_id": row["user_id"],
              "username": row["username"]
            }
          },
          "user": {
            "user_id": row["user_id"],
            "username": row["username"]
          },
          
        }
      })) : ([]);
      res.json(data);
    })
    
  },
  getOne: function(req, res) {
    projectData.getById(req.con, req.params.id, function(err, rows) {
      if (err) res.json({error: err});
      if (row.length() <= 0) {res.json({"message":"no rows"})}
      const row = rows[0];
      const data = row ?  {
        "task_id": row["task_id"],
        "archived": (row["archived"] === 0) ? false : true,
        "date": row["date"],
        "task": row["task"],
        "project": {
          "project_id": row["project_id"],
          "project_name": row["project_name"],
          "user": {
            "user_id": row["user_id"],
            "username": row["username"]
          }
        },
        "user": {
          "user_id": row["user_id"],
          "username": row["username"]
        },
        
      } : ({});
      res.json(data);
    })
    
  },

  create: function(req, res) {
    projectData.create(req.con, req.body, function(err) {
      if (err) res.json({
        "error": err,
        "status":500
        });
      res.json({
        "status": 204,
        "message": "Created successfully"
      })
    })
  },

  // destroy: function(req, res) {
  //   projectData.destroy(req.con, req.params.id, function(err) {
  //     if (err) res.json({
  //       "status": 500,
  //       "error": err
  //     });
  //     // res.redirect("/")
  //     res.json({
  //       "status": 204,
  //       "message": "Deleted successfully"
  //     })
  //   })
  // },

  update: function(req, res) {
    projectData.update(req.con, req.params.id, function(err) {
      if (err) res.json({
        "error": err,
        "status":500
        });
      res.json({
        "status": 204,
        "message": "PUT successfully"
      })
    })
  },

};