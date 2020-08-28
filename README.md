# Pub-Sub Challenge

**Problem Statement**

[Pangaea BE Coding Challenge](https://pangaea-interviews.now.sh/be). Recreating a Publisher Server (pub / sub) system using HTTP requests. Users should be able to 
1. Set up a subscription for a topic giving endpoint URL 
2. Publish an event message given as JSON to the supplied topic in the URL, through the option of either a Push or Pull mechanism for sending messages. Push in this case

<img src="https://pangaea-interviews.now.sh/_next/static/images/pubsub-diagram-15a833df7c2a0fd11cade0630fe8e8ba.png">

## Solution

#### Problem domain and proposed solution

For our system specified by the problem, this requires a one to many Pub-Sub model, where one Client(Publisher), Posts a message through the Publisher server which reroutes the message to subscribers. For such an event driven application, where the events are represented as messages, I chose the following design specifications. 

  #### Services
  
  _**Independent Units**_
  
  _The Client(Publisher) and Subscribing Server(Subscriber) represent the indepent endpoints communicating within this model_
  
  **Node JS**
  
  
  _**Message Broker**_
  
  _The Publisher Server acts as a message broker relaying messages between these parties or servives servers_
  
  **Cloud Pub/Sub by Google**
