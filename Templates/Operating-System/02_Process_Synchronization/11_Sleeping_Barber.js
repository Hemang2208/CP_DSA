// Topic: Sleeping Barber Problem
// Concept: A barber sleeps when no customers are waiting. Customers sit in a limited number
// of chairs or leave if the shop is full. Semaphores coordinate customers and the barber.
// Use: Producer-consumer style synchronization with a bounded waiting room.
// Time: O(c) for c customer events. Space: O(chairs).

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

const chairs = 3;
const waitingQueue = [];
const customers = new Semaphore(0);
const mutex = new Semaphore(1);
let barberSleeping = true;

function customerArrives(pid) {
    mutex.wait(pid);

    if (waitingQueue.length < chairs) {
        waitingQueue.push(pid);
        console.log(`${pid}: sits down (waiting = ${waitingQueue.length})`);
        customers.signal();
        mutex.signal();

        if (barberSleeping) {
            barberSleeping = false;
            console.log("Barber: wakes up");
        }
    } else {
        console.log(`${pid}: shop full, leaves`);
        mutex.signal();
    }
}

function barberWorks() {
    if (customers.count === 0) {
        barberSleeping = true;
        console.log("Barber: no customers, sleeping");
        return;
    }

    customers.wait("Barber");
    mutex.wait("Barber");
    const customer = waitingQueue.shift();
    mutex.signal();

    console.log(`Barber: takes ${customer} (waiting = ${waitingQueue.length})`);
    console.log(`Barber: cutting ${customer}'s hair`);
    console.log(`${customer}: haircut done, leaves`);
}

console.log("Sleeping Barber Simulation");
customerArrives("C1");
customerArrives("C2");
customerArrives("C3");
customerArrives("C4");

barberWorks();
barberWorks();
barberWorks();
barberWorks();

console.log(`\nFinal waiting customers: ${waitingQueue.length}`);
