const express = require("express")
const router = express.Router()
const controller = require("../controller/task")

router.get("/", controller.getAll);
router.get("/getOne/:id", controller.getOne);
router.post("/create", controller.create);
// router.delete("/delete/:id", controller.destroy);
router.put("/update/:id", controller.update);

//The 404 Route (ALWAYS Keep this as the last route)
router.all('*', function(req, res){
  res.status(400).send('what???');
});


module.exports = router