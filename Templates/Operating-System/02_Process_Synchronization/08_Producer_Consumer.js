// Topic: Producer-Consumer Problem
// Concept: Producers add items to a bounded buffer and consumers remove them. Semaphores
// track empty slots, full slots, and exclusive buffer access.
// Use: Queues, pipelines, logging systems, and device drivers.
// Time: O(1) per produce/consume. Space: O(bufferSize).

class Semaphore {
    constructor(count) {
        this.count = count;
        this.queue = [];
    }

    wait(pid) {
        if (this.count > 0) {
            this.count--;
            return true;
        }
        this.queue.push(pid);
        return false;
    }

    signal() {
        if (this.queue.length > 0) return this.queue.shift();
        this.count++;
        return null;
    }
}

const bufferSize = 3;
const buffer = [];
const empty = new Semaphore(bufferSize);
const full = new Semaphore(0);
const mutex = new Semaphore(1);

function produce(pid, item) {
    if (!empty.wait(pid)) {
        console.log(`${pid}: buffer full, producer blocked`);
        return;
    }

    mutex.wait(pid);
    buffer.push(item);
    console.log(`${pid}: produced ${item}, buffer = [${buffer.join(", ")}]`);
    mutex.signal();

    const woken = full.signal();
    if (woken) console.log(`${woken} was waiting for an item`);
}

function consume(pid) {
    if (!full.wait(pid)) {
        console.log(`${pid}: buffer empty, consumer blocked`);
        return;
    }

    mutex.wait(pid);
    const item = buffer.shift();
    console.log(`${pid}: consumed ${item}, buffer = [${buffer.join(", ")}]`);
    mutex.signal();

    const woken = empty.signal();
    if (woken) console.log(`${woken} was waiting for an empty slot`);
}

console.log("Bounded Buffer Producer-Consumer");
produce("P1", "A");
produce("P2", "B");
consume("C1");
produce("P3", "C");
produce("P4", "D");
consume("C2");
consume("C3");
consume("C4");

console.log(`\nFinal buffer: [${buffer.join(", ")}]`);
console.log(`Empty slots: ${empty.count}, Full slots: ${full.count}`);
