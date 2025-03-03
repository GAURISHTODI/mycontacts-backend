Hi, this is a basic backend code that helped me to learn Express.js and mongoDB, tested using ThunderClient.
Thriught this code, we can register as a user and can create,update delete and get contacts seamlessly thorugh our Database.

There is simply a server.js with middlewares like errorHandler, routing middleware to navigate to our respetive routes, and mongoDB setup middleware.
Then, there are two routes attached, contactRoutes.js and uerRoutes.js, the userRoute.js has navigation to three main routes of our project, namely register, login and current, with different purposes.
The contactRoute.js has routes like getContacts, createContact, updateContact, getContact,deleteContact for several individual purposes.

The .env file has Port and Connection string detials to connect to MongoDB server, which can't be shared publicly.

The two main middlewares in the project are in errorHandler.js and validateTokenHandler.js. ErrorHandler.js and Switch-Case condiitons to handle different errors thorughou the flow.
validateTokenHandler.js ensures a valid JWT token(Access key) is passed or not, when user is trying to login.

This was a basic project but gave me a brief idea of how backend flow occurs in a system, website or software.
