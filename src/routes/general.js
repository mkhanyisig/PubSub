const express = require('express');
const router = express();
const publishController = require("../controllers/publisher-controller");
const pub=require("./pub");
const subscriberController = require("../controllers/subscriber-controller");
var topics = require('./sub');
const notificationsController = require("../controllers/notification-controller");

// publishing endpoints
router.get("/", publishController.publisher);
router.post("/publish", publishController.publish); // publish to topic1 default
router.post("/publish/:topic", pub.publish);
router.post("/topic1", publishController.topic1);


// subscribe general enpoints
router.post("/event", subscriberController.pushSubscription); // pangaea code endpoint for push subscriptions

//router.get("/", subscriberController.subscriberHome);
router.get("/subscribe/", subscriberController.subscriberHome);
router.post("/subscribe/", subscriberController.subscriberHome);
router.get("/subscribe/pull", subscriberController.pullSubscription);
router.post("/subscribe/pull", subscriberController.pullSubscription);
router.post("/subscribe/push", subscriberController.pushSubscription);
router.post("/subscribe/:topic", topics.add);

// notification endpoints
//router.get("/", notificationsController.notificationsHome);
router.get("/pull",notificationsController.pullNotification);
router.post("/pull", notificationsController.pullNotification);
router.post("/push", notificationsController.pushNotification);


module.exports = router;
