const http = require('http');

const requestListener = function (req, res) {
  // Simulate a long-running request
  setTimeout(() => {
    res.writeHead(200);
    res.end('Hello, World!');
  }, 5000);
};

const server = http.createServer(requestListener);

// Handle potential errors
server.on('error', err => {
    console.error('Server error:', err);
});


let closed = false; //flag for closure
server.listen(8080);

// Handle the 'close' event before doing server.close()
server.on('close', () => {
    console.log('Server closed');
    closed = true;
});

// Use a timeout to simulate closing the server prematurely.
setTimeout(() => {
    if(!closed){
        server.close(() => {
            console.log('Server closed gracefully');
        });
    }
}, 3000);