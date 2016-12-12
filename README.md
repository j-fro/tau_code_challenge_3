##Node Express jQuery Code Challenge

### Objectives
- Initialize and spin up a server side node/express application.
- Send requests to the server from both the browser and using ajax in the client side script.
- Display response on the DOM.
- Demonstrate the separation of logic between the client and the server.

### The Joke Book

Your client has asked you to create a Joke Book application. The server will contain all the current joke data and you have been provided with the initial server file (```server/app.js```).

Your job will be to build up the server around the data in the ```server/app.js``` file, display the current jokes to the DOM, and add the ability for users to add their own jokes and display these too.

#####How the joke data is structured
You can view the full object in ```server/app.js```. The data structure is an array of objects. These objects have three properties: whoseJoke, jokeQuestion, and punchLine.

```
jokes = [
  {
    whoseJoke: "Huck",
    jokeQuestion: "What's the difference between roast beef and pea soup?",
    punchLine: "Anyone can roast beef."
  }]
```

To get started, fork this repo and clone it to your machine.

Overview
--------
* all jokes should be displayed on the DOM below the inputs
* the user should be able to add jokes using the input form

Remember to work in small increments and test often. If you want to take things further, first push the working basic mode to your github and update it after.

To-do
-----
* Server:
[x] GET jokes from the server
[x] POST new jokes to the server
* Client:
[x] Display jokes on DOM
[x] Collect input and send new joke
