// Topic: Readers-Writers Problem (Reader Preference)
// Concept: Multiple readers may read simultaneously, but a writer needs exclusive access.
// A mutex protects the reader count and a write semaphore protects the data.
// Use: Databases, caches, and file systems where reads are frequent.
// Time: O(1) per enter/exit. Space: O(n) for waiting readers/writers.

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

const readMutex = new Semaphore(1);
const writeSemaphore = new Semaphore(1);
let readerCount = 0;
let pendingWriter = null;

function readerEnter(pid) {
    readMutex.wait(pid);
    readerCount++;
    if (readerCount === 1) {
        const granted = writeSemaphore.wait(pid);
        console.log(`${pid}: first reader ${granted ? "locks" : "waits for"} the write semaphore`);
    }
    readMutex.signal();
    console.log(`${pid}: starts reading (active readers = ${readerCount})`);
}

function readerExit(pid) {
    readMutex.wait(pid);
    readerCount--;
    console.log(`${pid}: stops reading (active readers = ${readerCount})`);
    if (readerCount === 0) {
        const woken = writeSemaphore.signal();
        if (woken) {
            console.log(`${woken}: write semaphore released by last reader`);
            pendingWriter = woken;
        }
    }
    readMutex.signal();
}

function writerEnter(pid) {
    const granted = writeSemaphore.wait(pid);
    if (!granted) {
        pendingWriter = pid;
        console.log(`${pid}: writer blocked because readers/writer are active`);
        return false;
    }
    console.log(`${pid}: starts writing (exclusive access)`);
    return true;
}

function writerExit(pid) {
    console.log(`${pid}: stops writing`);
    const woken = writeSemaphore.signal();
    if (woken) console.log(`${woken}: can now enter`);
}

console.log("Readers-Writers Simulation");
readerEnter("R1");
readerEnter("R2");
writerEnter("W1");
readerExit("R1");
readerExit("R2");

if (pendingWriter) {
    console.log(`${pendingWriter}: starts writing after being unblocked`);
    writerExit(pendingWriter);
}

readerEnter("R3");
readerExit("R3");
console.log("Simulation complete.");
