const express = require("express");
const auth = require("auth");
const router = express.Router();
const multer = require("../middleware/multer-config");


const stuffCtrl = require("../controllers/stuff");

///api/stuff est l'url visée par l'application, la route sur notre API
router.get("/", auth, stuffCtrl.getAllThings);
router.post("/", auth, multer, stuffCtrl.createThing);
router.put("/:id", auth, stuffCtrl.modifyThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);
//le :id sinifique que cette partie de la route est dynamique
router.get("/:id", auth, stuffCtrl.getOneThing);


module.exports = router;