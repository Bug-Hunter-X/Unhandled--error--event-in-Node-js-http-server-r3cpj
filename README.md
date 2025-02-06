# Unhandled 'error' event in Node.js http server

This repository demonstrates an uncommon error in Node.js where an 'error' event is emitted on an HTTP server when it's closed before all pending requests are processed.  This can lead to unexpected behavior and crashes.

## Bug Description

The bug occurs when a server is closed using `server.close()` while there are still active requests being processed.  If these requests encounter errors during processing after the server closure, the resulting `'error'` events are not handled, resulting in an unhandled promise rejection or uncaught exception.  This frequently goes unnoticed in production environments. 

## Solution

The solution involves using the `'close'` event of the server to ensure all active requests are processed before the server is actually closed.  This event is emitted once the server has gracefully stopped accepting new requests and all pending connections have been closed.

## How to Reproduce the Bug

1. Clone this repository.
2. Run `node bug.js`.
3. Make several requests to `http://localhost:8080`.
4. Immediately after, run `node bugSolution.js`.