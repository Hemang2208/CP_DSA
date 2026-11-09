// Topic: Concurrent Execution Simulation
// Concept: Concurrent threads make progress by interleaving their instructions. A single-core
// CPU runs one thread at a time but switches between them rapidly.
// Use: Understanding interleaving, atomicity, and shared-state bugs.
// Time: O(total work). Space: O(threads).

const threads = [
    { id: "T1", steps: ["load A", "add 1", "store A"], index: 0 },
    { id: "T2", steps: ["load A", "add 1", "store A"], index: 0 },
    { id: "T3", steps: ["print A", "exit"], index: 0 }
];

let sharedA = 0;
let time = 0;

console.log("Concurrent Execution Interleaving");
while (threads.some((thread) => thread.index < thread.steps.length)) {
    for (const thread of threads) {
        if (thread.index >= thread.steps.length) continue;

        const instruction = thread.steps[thread.index];
        thread.index++;

        if (instruction === "load A") {
            thread.local = sharedA;
            console.log(`t=${time}: ${thread.id} loads A (${thread.local})`);
        } else if (instruction === "add 1") {
            thread.local++;
            console.log(`t=${time}: ${thread.id} adds 1 (${thread.local})`);
        } else if (instruction === "store A") {
            sharedA = thread.local;
            console.log(`t=${time}: ${thread.id} stores A = ${sharedA}`);
        } else if (instruction === "print A") {
            console.log(`t=${time}: ${thread.id} prints A = ${sharedA}`);
        } else {
            console.log(`t=${time}: ${thread.id} exits`);
        }

        time++;
    }
}

console.log(`\nFinal A = ${sharedA}`);
console.log("Interleaving can produce lost updates unless operations are atomic.");
