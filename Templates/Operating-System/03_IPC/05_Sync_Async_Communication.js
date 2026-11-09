// Topic: Synchronous and Asynchronous Communication
// Concept: A synchronous send/receive blocks until the other side is ready. An asynchronous
// send places the message in a buffer and returns immediately.
// Use: Choosing latency, buffering, and decoupling behavior in IPC designs.
// Time: O(1) per operation. Space: O(buffered messages).

class SyncChannel {
    constructor() {
        this.ready = false;
        this.payload = null;
    }

    send(sender, message) {
        console.log(`${sender}: synchronous send starts`);
        this.payload = message;
        this.ready = true;
        console.log(`${sender}: send completes only when receiver takes the message`);
    }

    receive(receiver) {
        if (!this.ready) {
            console.log(`${receiver}: receive blocks until a message arrives`);
            return null;
        }
        const message = this.payload;
        this.payload = null;
        this.ready = false;
        console.log(`${receiver}: received "${message}"`);
        return message;
    }
}

class AsyncChannel {
    constructor() {
        this.queue = [];
    }

    send(sender, message) {
        this.queue.push(message);
        console.log(`${sender}: asynchronous send returns immediately (buffered ${this.queue.length})`);
    }

    receive(receiver) {
        if (this.queue.length === 0) {
            console.log(`${receiver}: no buffered message`);
            return null;
        }
        const message = this.queue.shift();
        console.log(`${receiver}: received "${message}" (${this.queue.length} left)`);
        return message;
    }
}

console.log("Synchronous Communication");
const sync = new SyncChannel();
sync.receive("R1");
sync.send("S1", "hello");
sync.receive("R1");

console.log("\nAsynchronous Communication");
const asyncChannel = new AsyncChannel();
asyncChannel.send("S2", "msg-1");
asyncChannel.send("S2", "msg-2");
asyncChannel.send("S2", "msg-3");
asyncChannel.receive("R2");
asyncChannel.receive("R2");
asyncChannel.receive("R2");
asyncChannel.receive("R2");
