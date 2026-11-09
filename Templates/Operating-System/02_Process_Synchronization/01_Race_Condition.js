// Topic: Race Condition Simulation
// Concept: Two processes read-modify-write the same variable. If their steps interleave,
// one update can overwrite the other and an update is lost.
// Use: Explains why shared data needs mutual exclusion.
// Time: O(1). Space: O(1).

class SharedCounter {
    constructor() {
        this.value = 0;
    }

    read(process) {
        console.log(`${process} reads counter = ${this.value}`);
        return this.value;
    }

    write(process, value) {
        console.log(`${process} writes counter = ${value}`);
        this.value = value;
    }
}

console.log("Race condition: two unsynchronized increments");
const counter = new SharedCounter();

const firstRead = counter.read("P1");
const secondRead = counter.read("P2");

counter.write("P1", firstRead + 1);
counter.write("P2", secondRead + 1);

console.log(`Final counter value: ${counter.value}`);
console.log("Expected value with two increments: 2");
console.log("One increment was lost because both processes read the old value.");

console.log("\nCorrect sequential order:");
const safeCounter = new SharedCounter();
const first = safeCounter.read("P1");
safeCounter.write("P1", first + 1);
const second = safeCounter.read("P2");
safeCounter.write("P2", second + 1);
console.log(`Final counter value: ${safeCounter.value}`);
