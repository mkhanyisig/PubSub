const express = require('express');
const router = express();
const deliveryController = require("../controllers/subscriber-controller");
var topics = require('./sub');

router.get("/", deliveryController.subscriberHome);
router.get("/subscribe/", deliveryController.subscriberHome);
router.post("/subscribe/", deliveryController.subscriberHome);
router.get("/subscribe/pull", deliveryController.pullSubscription);
router.post("/subscribe/pull", deliveryController.pullSubscription);
router.post("/subscribe/push", deliveryController.pushSubscription);
router.post("/event", deliveryController.pushSubscription); // pangaea code endpoint for push subscriptions
router.post("/subscribe/:topic", topics.add);

module.exports = router;
