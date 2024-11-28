const data = require("../models/user");

module.exports = {
  getAll: function(req, res) {
    data.getAll(req.con, function(err, rows) {
      if (err) res.json({error: err});
      // res.json(rows || []);
      const data = rows ? (rows.map( row => {return {
        "user": {
          "user_id" : row["user_id"],
          "username" : row["username"],
          "password" : row["password"]
        }
      } }) ) : ([]);
      res.json(data);
    })
  },
  getOne: function(req, res) {
    data.getById(req.con, req.params.name, function(err, rows) {
      if (err) res.json({error: err});
      // res.json(rows[0] || {});

      const row = rows[0];
      const data = row ?  {
        "user": {
          "user_id" : row["user_id"],
          "username" : row["username"],
          "password" : row["password"]
        }
      } : ({});
      res.json(data);
    })
    
  },

  // store: function(req, res) {
  //   userData.create(req.con, req.query, function(err) {
  //     if (err) res.json({error: err});
  //     res.redirect("/users")
  //   })
  // },

  // destroy: function(req, res) {
  //   userData.destroy(req.con, req.params.name, function(err) {
  //     if (err) res.json({error: err});
  //     res.redirect("/users")
  //   })
  // },

  // update: function(req, res) {
  //   userData.update(req.con, req.query, req.params.id, function(err) {
  //     if (err) res.json({error: err});
  //     res.redirect(`/users/${req.query.username}`)
  //   })
  // },

};