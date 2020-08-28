const { PubSub, v1 } = require("@google-cloud/pubsub");

const pubSubClient = new PubSub();
const pubSubClient2 = new v1.PublisherClient();
const topicName = "topic1";

const pubsubRepository = require("../repositories/pub-sub-repo");

const { publishMessage } = pubsubRepository;

let payload;

module.exports = {
    publisher: (req, res) => {
        //console.log(req);
        //console.log(res);

        console.log("* ==> Publisher route confirmed :)");
        return res.status(200).json({
            success: true,
            message: "Publisher route confirmed :)",
        })
    },

    publish: async (req, res) => {
        let ordersObj = req.body;
        payload=ordersObj;

        console.log("\n**********\nPublisher\n***********\n");

        let pmsg={"topic":topicName,"data":ordersObj};

        let messageId = await publishMessage(pubSubClient, topicName, pmsg);

        console.log("publishing to "+topicName);
        return res.status(200).json({
            success: true,
            message: `Message ${messageId} published `
        })
    },

    topic1: async (req, res) => { // publish to topic 1
        console.log("\n**********\nPublisher\n***********\n");
        let ordersObj = req.body;
        payload=ordersObj;
        let tname="topic1";
        let pmsg={"topic":tname,"data":ordersObj};

        let messageId = await publishMessage(pubSubClient, tname, pmsg);

        console.log("publishing to "+topicName);
        return res.status(200).json({
            success: true,
            message: `Message ${messageId} published `
        })
    }

};
