const express = require("express")
const router = express.Router()
const controller = require("../controller/user")

router.get("/", controller.getAll);
router.get("/:name", controller.getOne);
// router.post("/create", userController.store);
// router.delete("/:name", userController.destroy);
// router.put("/:id", userController.update);

//The 404 Route (ALWAYS Keep this as the last route)
// router.all('*', function(req, res){
//   res.status(400).send('what???');
// });


module.exports = router