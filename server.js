const express = require('express');
const path = require('path');
const fs = require('fs');  // For logging
const app = express();
const port = 3000;

app.use(express.json());

let resources = [];
let cache = {};  // In-memory cache

// Logging middleware
function logRequest(req, res, next) {
    const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url} - ${res.statusCode}\n`;
    fs.appendFileSync(path.join(__dirname, 'server.log'), logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file', err);
        }
    });
    next();
}

app.use(logRequest);

// Serve the static HTML file
app.use(express.static(path.join(__dirname)));

// POST: Create a resource (with duplicate ID check)
app.post('/resources', (req, res) => {
    const resource = req.body;

    // Check for duplicate ID
    const existingResource = resources.find(r => r.id === resource.id);
    if (existingResource) {
        return res.status(400).send({ error: 'Resource with this ID already exists' });
    }

    resources.push(resource);
    res.status(201).send(resource);
});

// GET: Read all resources with caching
app.get('/resources', (req, res) => {
    const cacheKey = 'allResources';
    
    // Check if data is cached
    if (cache[cacheKey]) {
        console.log('Serving from cache');
        return res.status(200).send(cache[cacheKey]);
    }

    res.status(200).send(resources);
    
    // Cache the response for future requests
    cache[cacheKey] = resources;
    setTimeout(() => {
        delete cache[cacheKey];  // Invalidate the cache after a certain time (e.g., 10 minutes)
    }, 10 * 60 * 1000);  // Cache expiry of 10 minutes
});

// PUT: Update a resource by id
app.put('/resources/:id', (req, res) => {
    const id = req.params.id;
    const updatedResource = req.body;

    // Find the resource to update
    const resourceIndex = resources.findIndex(r => r.id === id);
    if (resourceIndex === -1) {
        return res.status(404).send({ error: 'Resource not found' });
    }

    // Update the resource
    resources[resourceIndex] = { ...resources[resourceIndex], ...updatedResource };
    res.status(200).send(resources[resourceIndex]);

    // Invalidate the cache
    delete cache['allResources'];
});

// DELETE: Delete a resource by id
app.delete('/resources/:id', (req, res) => {
    const id = req.params.id;
    const initialLength = resources.length;

    resources = resources.filter(resource => resource.id !== id);

    if (resources.length === initialLength) {
        return res.status(404).send({ error: `Resource with id ${id} not found` });
    }

    res.status(200).send(`Resource with id ${id} deleted`);

    // Invalidate the cache
    delete cache['allResources'];
});

// Error handling middleware
app.use((err, req, res, next) => {
    const errorLog = `${new Date().toISOString()} - ERROR - ${req.method} ${req.url} - ${err.message}\n`;
    fs.appendFileSync(path.join(__dirname, 'server.log'), errorLog, (error) => {
        if (error) {
            console.error('Failed to write error log', error);
        }
    });
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`REST API server is running on http://localhost:${port}`);
    });
}
module.exports = app;