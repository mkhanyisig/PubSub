const { PubSub  } = require("@google-cloud/pubsub");
const pubSubClient = new PubSub();
const subscriptionName = "subscriberA";
const timeout = 60;

const pubsubRepository = require("../repositories/pub-sub-repo");
const { listenForPullMessages,listenForPushMessages } = pubsubRepository;

module.exports = {
    subscriberHome: (req, res) => {
        //console.log(req);
        //console.log(res);
        console.log("* ==>  Subscriber route confirmed :)");
        return res.status(200).json({
            success: true,
            message: "Subscriber route confirmed :)",
        })
    },

    pullSubscription: (req, res) => {
        try {
            console.log("\n**********\n Subscription: Pull Endpoint\n***********\n");
            console.log("* ==> Pulling messages from Publisher on topic : ");
            listenForPullMessages(pubSubClient, subscriptionName, timeout);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Couldn't recieve orders object :)",
                data: error
            })
        }
        return res.status(200).json({ // Message Ack
            success: true,
            message: "Just Pulled Messages from Publisher for Subscriber => delivery :)",
        })
    },

    pushSubscription: (req, res) => { // processes push deliveries to endpoint URL when received
        try {
            console.log("\n**********\nSubscription: Push Endpoint\n***********\n");
            console.log("listening for Push messages");
            //listenForPushMessages(req.body.message);

            //console.log("Raw Request: \n"+JSON.stringify(req.body));

            // The message is a unicode string encoded in base64.
            const message = Buffer.from(req.body.message.data, 'base64').toString(
              'utf-8'
            );

            console.log("\n*==>\nPushed message to Subscriber  @ "+req.body.subscription+"  \n\n##\n"+message+"\n##\n****\n")

            //console.log("Message: \n"+JSON.stringify(req.body));
            //console.log("Message: \n"+req.body);

        } catch (error) {
            console.log("\n***\nerror: \n"+error+"\n****\n");
            console.log(req.body);
            return res.status(500).json({
                success: false,
                message: "Couldn't recieve orders object :)",
                data: error
            })
        }

        return res.status(200).json({ // Message Ack
            success: true,
            message: "Just Pushed Messages to the Deliveries Endpoint :)",
        })

    }


};
