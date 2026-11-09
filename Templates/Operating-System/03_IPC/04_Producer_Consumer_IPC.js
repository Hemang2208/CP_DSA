// Topic: Producer-Consumer Communication via IPC
// Concept: A producer sends items through a bounded message queue and a consumer receives
// them. The queue decouples their speeds.
// Use: Log processing, task queues, and streaming data pipelines.
// Time: O(1) per enqueue/dequeue. Space: O(queue capacity).

class MessageQueue {
    constructor(capacity) {
        this.capacity = capacity;
        this.items = [];
    }

    produce(pid, item) {
        if (this.items.length === this.capacity) {
            console.log(`${pid}: queue full, cannot produce ${item}`);
            return false;
        }
        this.items.push(item);
        console.log(`${pid} produced ${item}, queue = [${this.items.join(", ")}]`);
        return true;
    }

    consume(pid) {
        if (this.items.length === 0) {
            console.log(`${pid}: queue empty, nothing to consume`);
            return null;
        }
        const item = this.items.shift();
        console.log(`${pid} consumed ${item}, queue = [${this.items.join(", ")}]`);
        return item;
    }
}

const queue = new MessageQueue(3);
console.log("Producer-Consumer IPC");
queue.produce("Producer", "task-1");
queue.produce("Producer", "task-2");
queue.consume("Consumer");
queue.produce("Producer", "task-3");
queue.produce("Producer", "task-4");
queue.produce("Producer", "task-5");
queue.consume("Consumer");
queue.consume("Consumer");
queue.consume("Consumer");
queue.consume("Consumer");

console.log(`Final queue: [${queue.items.join(", ")}]`);
