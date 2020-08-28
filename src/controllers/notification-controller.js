const { PubSub } = require("@google-cloud/pubsub");
const pubSubClient = new PubSub();
const subscriptionName = "subscriberB";
const timeout = 60;

const pubsubRepository = require("../repositories/pub-sub-repo");
const { listenForPullMessages,listenForPushMessages } = pubsubRepository;


module.exports = {
    notificationsHome: (req, res) => {
        //console.log(req);
        console.log("* ==> Notifications route confirmed :)");
        return res.status(200).json({
            success: true,
            message: "Notifications route confirmed :)",
        })
    },

    pullNotification: (req, res) => {
        try {
            console.log("* ==> Pulling messages from Orders");
            listenForPullMessages(pubSubClient, subscriptionName, timeout);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Couldn't recieve notification object :)",
                data: error
            })
        }

        return res.status(200).json({ // Message Ack
            success: true,
            message: "Just Pulled Messages from Orders for Subscriber => Notification :)",
        })
    },

    pushNotification: (req, res) => { // processes push deliveries to endpoint URL when received
      try {
          console.log("listening for Push messages");
          //listenForPushMessages(req.body.message);

          // The message is a unicode string encoded in base64.
          const message = Buffer.from(req.body.message.data, 'base64').toString(
            'utf-8'
          );

          console.log("****\nPushed message to Notifications =>\n##\n"+message+"\n##\n****\n")

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
          message: "Just Pushed Messages to the Notification Endpoint :)",
      })
    }
};
