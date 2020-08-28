module.exports = {
    publishMessage: async (pubSubClient, topicName, payload) => {
        const dataBuffer = Buffer.from(JSON.stringify(payload));
        console.log("Message Posted => Payload: \n"+JSON.stringify(payload));
        console.log("******\ndata buffer:\n"+dataBuffer+"\n******\n");

        const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
        return messageId;
    },

    listenForPullMessages: (pubSubClient, subscriptionName,  timeout) => {
        const subscription = pubSubClient.subscription(subscriptionName);

        let messageCount = 0;
        const messageHandler = message => {
            console.log(`Received message ${message.id}:`);
            console.log(`\tData: ${message.data}`);
            console.log(`\tAttributes: ${message.attributes}`);
            messageCount += 1;

            message.ack();
        };

        subscription.on('message', messageHandler);

        setTimeout(() => {
            subscription.removeListener('message', messageHandler);
            console.log(`${messageCount} message(s) received.`);
        }, timeout * 1000);
    },

    listenForPushMessages: (payload) => {
      console.log("payload => \n"+payload);
      const message = Buffer.from(payload, 'base64').toString(
          'utf-8'
      );
      console.log(`Received message ${message.id}:`);
      console.log(`\tData: ${message.data}`);
      console.log(`\tAttributes: ${message.attributes}`);

      let parsedMessage = JSON.parse(message);
      //console.log(parsedMessage);
      return parsedMessage;
    }

};
