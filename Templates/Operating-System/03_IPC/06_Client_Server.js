// Topic: Client-Server Communication Simulation
// Concept: Clients send requests to a server. The server queues requests, processes them,
// and returns responses to the matching client.
// Use: Network services, RPC, web servers, and database front ends.
// Time: O(1) per request/response. Space: O(pending requests).

class Server {
    constructor(name) {
        this.name = name;
        this.requestQueue = [];
    }

    receiveRequest(client, request) {
        const id = this.requestQueue.length + 1;
        this.requestQueue.push({ id, client, request });
        console.log(`Server ${this.name}: queued request #${id} from ${client}: ${request}`);
    }

    processNext() {
        if (this.requestQueue.length === 0) {
            console.log("Server: no pending requests");
            return;
        }

        const job = this.requestQueue.shift();
        const response = `result for "${job.request}"`;
        console.log(`Server: processed request #${job.id}`);
        console.log(`Server -> ${job.client}: ${response}`);
    }
}

const server = new Server("file-service");
console.log("Client-Server Communication");
server.receiveRequest("Client-A", "read report.txt");
server.receiveRequest("Client-B", "write notes.txt");
server.receiveRequest("Client-C", "list /home");

server.processNext();
server.processNext();
server.processNext();
server.processNext();

console.log(`Pending requests: ${server.requestQueue.length}`);
