const express = require('express');
const router = express();
const publishController = require("../controllers/publisher-controller");
const pub=require("./pub");


router.get("/", publishController.publisher);
router.post("/publish", publishController.publish); // publish to topic1 default
router.post("/publish/:topic", pub.publish);
router.post("/topic1", publishController.topic1);


module.exports = router;
