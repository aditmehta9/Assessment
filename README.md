# WebSocket & REST API Project

This project demonstrates the implementation of a WebSocket server and a RESTful API server using Node.js and Express. It includes features for handling multiple WebSocket connections, CRUD operations for resources, caching mechanisms, error handling, and basic unit testing.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Logging](#logging)
- [Follow-Up Questions](#follow-up)
- [Snippets](#Snippets)

## Features

- WebSocket server capable of handling multiple client connections.
- RESTful API with CRUD operations (Create, Read, Update, Delete).
- Caching mechanism for improved performance.
- Error handling for robustness.
- Unit tests for core functionality.
- HTML interface for interaction with the WebSocket and REST API servers.
- Logging of API requests and responses to a log file.

## Technologies Used

- Node.js
- Express.js
- WebSocket
- Mocha (for testing)
- Supertest (for API testing)
- HTML/CSS (for the frontend interface)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/aditmehta9/Assessment.git
   cd Assessment
   ```

2. **Install Dependencies**

   Make sure you have Node.js installed. Run the following command to install the required packages:

   ```bash
   npm install
   ```

3. **Create a `.env` File** (if necessary)

   If your application requires environment variables, create a `.env` file in the root directory and add any necessary variables.

## Running the Project

To start the WebSocket server, run:

```bash
node websocket.js
```
To start the REST API server, run:

```bash
node server.js
```

The servers will be accessible at:

- **WebSocket Server**: `ws://localhost:8080`
- **REST API Server**: `http://localhost:3000`

## Testing

To run the unit tests for the REST API, use:

```bash
npm test
```

Make sure your server is running before executing the tests.

## Logging

The server logs API requests and errors in a `server.log` file located in the project root. This can help with debugging and monitoring the application.

## Follow Up
**1. Explain the architecture of your WebSocket server and RESTful API server. How have you structured your code to handle different endpoints and requests efficiently?**:

**Architecture of WebSocket Server and RESTful API Server**

**1. WebSocket Server:**

The WebSocket server is designed to handle real-time communication between clients. It is implemented using the ws library, which is a simple and efficient WebSocket library for Node.js. This server allows multiple clients to connect and broadcast messages to all connected clients. The architecture ensures each client is assigned a unique Client ID upon connection, which helps identify and manage individual clients during communication.
Key Features:

- Client ID Assignment: Each client is assigned a random unique ID upon connection, which is used to identify and broadcast messages to other clients.
- Broadcasting Messages: When a client sends a message, the server broadcasts it to all connected clients, including the sender.
- Real-time Communication: WebSockets enable real-time data flow, suitable for applications requiring instant message exchange, such as chat applications.

**2. RESTful API Server:**

The RESTful API server is built using the Express framework, which simplifies the creation of server-side applications by providing routing and middleware features. The server supports CRUD (Create, Read, Update, Delete) operations on resources.
Key Features:

- CRUD Endpoints: The server provides endpoints for creating, reading, updating, and deleting resources (/resources).
- Duplicate ID Check: To avoid resource duplication, the server checks for unique resource IDs during creation.
- Error Handling: Errors, such as resource not found or duplicate IDs, are handled gracefully, sending appropriate HTTP status codes and messages.
- Logging: All HTTP requests (success or failure) are logged into a file server.log for monitoring and debugging purposes.
- Caching: The server implements basic caching to store frequently accessed resources, improving performance and reducing redundant database or memory lookups.

**3. Code Structure:**

The code is structured in a modular way to handle different endpoints efficiently. Middleware is used to log all incoming requests and handle errors. Each endpoint (POST, GET, PUT, DELETE) has a specific function for resource management, making it easy to extend the functionality in the future by adding new routes or modifying existing ones.

**4. Error Handling:**

A dedicated error-handling middleware is added at the end of the middleware stack to catch unhandled errors, ensuring the server doesn't crash and provides informative error messages to clients. It logs the error stack trace to the console and sends a generic "Something went wrong!" message to the client with a 500 status code for server-side errors.

**4. Design Pattern:**

For the architecture of the WebSocket Server and RESTful API Server, design patterns such as middleware modules are employed to facilitate request handling. This approach allows for a modular structure, where different functionalities can be separated into distinct layers. By doing so, the application becomes more scalable and maintainable, enabling easier modifications and enhancements in the future.

**2. Discuss the design decisions, libraries, and frameworks used in your implementation. Explain how your servers handle different types of requests and how they could be extended or modified for additional functionality in the future.**:

**Design Decisions, Libraries, and Frameworks:**

**1. Libraries and Frameworks:**
- Express.js: Used to set up the RESTful API server. It's lightweight, modular, and offers built-in routing and middleware features, making it a popular choice for building APIs.
- WebSocket (ws): Used for real-time communication via WebSockets. This library offers efficient handling of multiple connections and broadcasting of messages between clients.
- Mocha: A JavaScript test framework used for unit testing the API endpoints. It's simple to set up and provides an easy way to write asynchronous tests, essential for testing HTTP requests and WebSocket functionality.
- Supertest: A library used alongside Mocha for testing the API endpoints. It helps simulate HTTP requests and validate the server's responses.
- Node.js built-in fs: Used to create and write logs into server.log. This ensures every API request, both successful and failed, is logged for future debugging or monitoring.

**2. Design Decisions:**
- Separation of WebSocket and API Logic: The WebSocket server and the RESTful API server are separated in terms of logic but run concurrently. This keeps the real-time communication layer distinct from the RESTful operations, improving code modularity and readability.
- Unique Client IDs: Assigning unique IDs to each client in the WebSocket server allows for better identification and management of client connections and messages.
- Logging for Traceability: Logging all request activity in the server.log file improves the ability to debug and monitor the server's health and request patterns. This design decision helps in auditing and maintaining the system over time.
- Cache Implementation: Caching frequently accessed data (like read operations) reduces the load on the server and speeds up response times. The cache could be extended using more advanced strategies (such as LRU caching) if the application grows in scale.
- HTML Interface: The HTML file serves as a front-end to display the WebSocket communication and REST API actions. It simplifies testing and demonstrating the functionality in a user-friendly way, rather than relying on Postman or terminal outputs alone.

**3. How Requests are Handled:**
- WebSocket Requests: On connection, the server assigns a unique ID to the client and sends a message to confirm the connection. When a message is sent from a client, the server broadcasts it to all other connected clients.
- RESTful API Requests: Each API request is routed based on the HTTP method (POST, GET, PUT, DELETE). Error handling and validation (such as checking for duplicate IDs) are built into the request lifecycle, and the request results (whether successful or failed) are logged into the server.log file.

**Future Extensibility:**

**The architecture allows for easy extension:**

- Additional Endpoints: New CRUD operations or entirely new resources can be added easily by extending the routing logic in Express.js.
- Authentication: Authentication mechanisms (e.g., JWT or OAuth) can be added to secure API endpoints.
- Advanced Caching: Caching could be extended with third-party libraries such as Redis to handle larger datasets or implement advanced caching strategies.
- Scaling WebSocket: If the number of connected clients grows, WebSocket load balancing techniques or distributed systems like Socket.io could be implemented.
- The architecture is designed to handle load testing, ensuring that the server can efficiently manage high traffic or increased client connections.

**Unit Testing:**

I used Mocha and Supertest to test the REST API endpoints. These tests simulate HTTP requests (e.g., POST, GET, PUT, DELETE) to ensure the correct functionality of the API. The tests validate the creation, retrieval, updating, and deletion of resources. They also check for proper error handling when a resource is not found or when a duplicate ID is provided.
In conclusion, the combination of WebSockets for real-time communication, Express.js for RESTful API creation, and Mocha for testing creates a scalable, efficient, and testable application with error handling, logging, and caching features.

## Snippets
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/c56bd098-f580-4dbd-86fb-8f2212f5c76d">
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/f392849c-e635-452c-a38c-79097ade5807">
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/d0490fb3-487f-4a60-8afa-fbc8c6ffc456">
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/ca098847-f970-4f5b-8182-4cb70173cc57">
