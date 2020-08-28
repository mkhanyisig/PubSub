// publish message

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();


exports.publish = function(req, res){

  const topicName = req.params.topic;

  console.log("\n**********\nPublisher Endpoint\n***********\n");

  console.log("publishing to "+topicName+"\n");

  async function publishMessage() {
   /**
    * TODO(developer): Uncomment the following lines to run the sample.
    */
   //

   // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
   //console.log("Message Sent: \n"+req.body);
   let data = JSON.stringify({"topic":topicName,"data":req.body});

   console.log("Message Sent: \n\n"+data);

   const dataBuffer = Buffer.from(data);

   const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
   console.log(`Message ${messageId} published.`);
 }



 try{
   publishMessage();
 }catch(err){
   console.log("*=> Error in publishing message\n\n"+err);
 }

  return res.status(200).json({
      success: true,
      message: "Message published succesfully",

  });
};
