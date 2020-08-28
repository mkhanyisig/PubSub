// fake topics database

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();


//topics.add();

exports.add = function(req, res){
  console.log("\n**********\nSubscription Endpoint: Adding topic Subscription\n***********\n");
  let min=1000;
  let max=9999;
  let num=Math.random() * (max - min) + min;

  // create Unique subscription endpoint each time
  let subscriptionName="subscriber"+parseInt(num);

  console.log("entered subname "+req.body.subname);
  /*
  if(req.body.subname!=undefined){
      console.log("subscription name given");
      subscriptionName=req.body.subname;
  }
  */

  var topicName = req.params.topic;
  console.log("topic posted:  "+topicName);

  /*
  if (arr.includes(topicName)) {
      // do something
      console.log("topic already contained");

  }else{
  */
  // create Push subscription for topic
  console.log("posted URL :"+req.body.url);
  //
  if(req.body.url==undefined){
      console.log("==> Endpoint URL error: Please enter a valid *** PUBLIC URL ***");
      return res.status(400).json({
          success: true,
          message: "Endpoint URL error: Please enter a valid *** PUBLIC URL ***",
      });
  }
  if(req.body.url=="http://localhost:8000/event"){
      console.log("==> Endpoint URL error: Please enter a *** PUBLIC URL *** (Use Ngrok)\n GCP Error: Unacceptable URL");
      return res.status(400).json({
          success: true,
          message: "Endpoint URL error: Please enter a *** PUBLIC URL *** (Use Ngrok)\n GCP Error: Unacceptable URL",
      });
  }


  async function createPushSubscription() {

    const options = {
      pushConfig: {
        // Set to an HTTPS endpoint of your choice. If necessary, register
        // (authorize) the domain on which the server is hosted.
        pushEndpoint: req.body.url
      }
    };

    await pubSubClient
      .topic(topicName)
      .createSubscription(subscriptionName, options);

    console.log(`Subscription ${subscriptionName} created.`);
  };

  try{
    createPushSubscription();
  }catch(err){
    console.log("*=> Error in creating PUSH subscrition:\n\n"+err);
  }


  console.log("topic PUSH subscription added");

  return res.status(200).json({
      success: true,
      message: "Topic added succesfully",
      topics: topicName,
  });
};
