const express = require("express")
const router = express.Router()
const controller = require("../controller/project")

router.get("/", controller.getAll);
router.get("/users/:id", controller.getByUser);
router.get("/users/:user_id/projects/:project_id", controller.getProjectID);
router.delete("/delete/:id", controller.destroy);
router.post("/users/:id/create", controller.createProject);
// router.put("/:id", userController.update);

//The 404 Route (ALWAYS Keep this as the last route)
// router.all('*', function(req, res){
//   res.status(400).send('what???');
// });


module.exports = router