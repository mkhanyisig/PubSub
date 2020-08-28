# Pub-Sub Challenge

**Problem Statement**

[Pangaea BE Coding Challenge](https://pangaea-interviews.now.sh/be). Recreating a Publisher Server (pub / sub) system using HTTP requests. Users should be able to 
1. Set up a subscription for a topic giving endpoint URL 
2. Publish an event message given as JSON to the supplied topic in the URL, through the option of either a Push or Pull mechanism for sending messages. Push in this case

<img src="https://pangaea-interviews.now.sh/_next/static/images/pubsub-diagram-15a833df7c2a0fd11cade0630fe8e8ba.png">

## Solution

#### Problem domain and proposed solution

For our system specified by the problem, this requires a one to many Pub-Sub model, where one Client(Publisher), Posts a message through the Publisher server which reroutes the message to all subscribed servers or subscribers on each Post. Servers can subscribe to topic as well. For such an event driven application, where the events are represented as inter-communication messages, I chose the following design specifications. 

  #### Services
  
  _**Independent Units**_
  
  _The Client(Publisher) and Subscribing Server(Subscriber) represent the indepent endpoints communicating within this model_
  
  **Node JS**
  
  This is a great backend platform primarily used for non-blocking, event-driven servers, due to its single-threaded nature.It is robustly designed with real-time, push-based architectures in mind and thus serves our purpose well. It also has great documentation, modules and frameworks which abstract the application process and creates a smooth server environment for REST applications. 
  
  _**Message Broker**_
  
  _The Publisher Server acts as a message broker relaying messages between these parties or servives servers_
  
  **Cloud Pub/Sub by Google**
  
  Google Pub/Sub being a message broker can receive message from the the client(publisher), and act as a relay between the the subscribers and the other services. The Cloud Pub-Sub architecture takes care of errors like anomalies when making HTTP requests like service downtimes, system failures and scaling problems when new services are introduced. More features or services can be added whilst keeping the system in Rhythm. 
  
  This problem specificies a Push driven architecture for posts, but GCP Pub-Sub supports both Push and Pull architectures. 
  
 ## Implementation
 
 ### Prerequisites
 
 1. A development machine configured to run Node.j
 2. [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) installed - package mananger for Node JS
 3. [Ngrok](https://ngrok.com/download) to make local ports publicly accesible for push requests on GCP, as local endpoints are not publicly accesible
 4. PostMan to test REST requests
 ### Node Modules/Packages required
 
 **express** — A lightweight Node.js web framework for spinning up RESTful APIs. We will use this to handle routing in our backend API
**nodemon** — This package will help us automatically restart our development server when we make code changes/edits
**body-parser** — A middleware to parse incoming request inputs into our req.body object
**morgan** — HTTP request logger middleware for Node.js. This will help us debug our API while in development
**helmet** — This is a collection of middlewares for which our express-based server by setting HTTP headers which conforms to best security practices
**cors** — This package will help enable cross-origin resource sharing on our server
**dotenv** — This package will enable us to have access to the environment defined in a .env file from our Node application via the process.env object
**google-cloud/pubsub** — This is the Node.js client for Cloud Pub/Sub. We will be using this to publish messages and subscribe to topics defined in our pub/sub console

