const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Keeps track of clients with their IDs
let clients = new Map();

// Function to generate a random ID
function generateClientId() {
    return Math.random().toString(36).substring(2, 9);
}

wss.on('connection', (ws) => {
    // Assign a unique ID to the client
    const clientId = generateClientId();
    clients.set(ws, clientId);
    console.log(`Client ${clientId} connected`);

    // Send a message to the client confirming connection
    ws.send(`You are connected as Client ${clientId}`);

    // When a client sends a message
    ws.on('message', (message) => {
        console.log(`Client ${clientId}: ${message}`);
        // Broadcast the message to all clients with the sender's ID
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Client ${clientId}: ${message}`);
            }
        });
    });

    // When the client disconnects
    ws.on('close', () => {
        console.log(`Client ${clientId} disconnected`);
        clients.delete(ws);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');

