const cors        = require('cors');
const express     = require('express');
const morgan      = require("morgan");
const bodyParser  = require("body-parser");
const con         = require("./config/db.js")
const PORT        = process.env.REACT_APP_SERVER_PORT || 8000;
const app         = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended: false}))

// connecting route to database
app.use(function(req, res, next) {
  req.con = con
  next()
})

app.use(express.json())

const API_VERSION = process.env.API_VERSION || "/api/v1";

app.use(`${API_VERSION}/users`, require("./router/user"));
app.use(`${API_VERSION}/projects`, require("./router/project"));
app.use(`${API_VERSION}/tasks`, require("./router/task"));

app.get('*', function(req, res){
  res.status(404).json({
    message: 'Could not find what you were seeking',
    status: 404,
    url: req.url
  });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    message: "There was something error with the current URL. Probably something wrong with the server!",
    status: 500,
    url: req.url
  });
});

app.listen(PORT , () => {
  console.log(`App server now listening on port ${PORT}`);
});


