import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio';
import express from '@feathersjs/express';
import redis from 'redis';

// Import your service
import messageService from './services/message/message.service';

// Create a feathers instance.
let app = express(feathers());

// Enable Socket.io
app.configure(socketio());

// Enable REST services
app.configure(express.rest());

// Connect to Redis
let client = redis.createClient();

client.on('connect', function() {
    console.log('Connected to Redis...');
});

// Register your service
app.use('/messages', messageService({ client }));

// Setup a nice base route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Error handling
app.use(express.errorHandler());

// Start the server.
const port = 3030;

app.listen(port, () => {
    console.log(`Feathers server listening on port ${port}`);
});

export default app;
