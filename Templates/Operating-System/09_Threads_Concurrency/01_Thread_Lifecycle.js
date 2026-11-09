// Topic: Thread Lifecycle Simulation
// Concept: A thread moves through New, Runnable, Running, Blocked/Waiting, and Terminated.
// Thread states are similar to process states but share the process address space.
// Use: Understanding thread scheduling and synchronization behavior.
// Time: O(n) for n transitions. Space: O(1).

const transitions = {
    NEW: ["RUNNABLE"],
    RUNNABLE: ["RUNNING"],
    RUNNING: ["BLOCKED", "WAITING", "RUNNABLE", "TERMINATED"],
    BLOCKED: ["RUNNABLE"],
    WAITING: ["RUNNABLE"],
    TERMINATED: []
};

class Thread {
    constructor(id) {
        this.id = id;
        this.state = "NEW";
        this.history = ["NEW"];
    }

    move(next) {
        if (!transitions[this.state].includes(next)) {
            console.log(`T${this.id}: invalid ${this.state} -> ${next}`);
            return;
        }
        console.log(`T${this.id}: ${this.state} -> ${next}`);
        this.state = next;
        this.history.push(next);
    }
}

const thread = new Thread(1);
console.log("Thread Lifecycle");
thread.move("RUNNABLE");
thread.move("RUNNING");
thread.move("BLOCKED");
thread.move("RUNNABLE");
thread.move("RUNNING");
thread.move("WAITING");
thread.move("RUNNABLE");
thread.move("RUNNING");
thread.move("TERMINATED");
console.log(`History: ${thread.history.join(" -> ")}`);
