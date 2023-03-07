const express = require("express");
const router = express.Router();

const stuffCtrl = require("../controllers/stuff");

router.post("/", stuffCtrl.createThing);
router.put("/:id", stuffCtrl.modifyThing);
router.delete("/:id", stuffCtrl.deleteThing);
//le :id sinifique que cette partie de la route est dynamique
router.get("/:id", stuffCtrl.getOneThing);
///api/stuff est l'url visée par l'application, la route sur notre API
router.get("/", stuffCtrl.getAllThings);

module.exports = router;