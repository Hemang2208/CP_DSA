// Topic: Process States and State Transitions
// Concept: A process moves through New, Ready, Running, Waiting and Terminated.
// The scheduler moves Ready -> Running, and events move Running -> Waiting/Ready.
// Use: State diagrams explain how an OS manages process lifecycles and scheduling.
// Time: O(n) for n transitions. Space: O(1) for the current state.

const allowedTransitions = {
    NEW: ["READY"],
    READY: ["RUNNING"],
    RUNNING: ["WAITING", "READY", "TERMINATED"],
    WAITING: ["READY"],
    TERMINATED: []
};

class ProcessStateMachine {
    constructor(pid) {
        this.pid = pid;
        this.state = "NEW";
        this.history = ["NEW"];
    }

    transition(nextState) {
        const allowed = allowedTransitions[this.state];
        if (!allowed.includes(nextState)) {
            console.log(`PID ${this.pid}: INVALID transition ${this.state} -> ${nextState}`);
            return false;
        }

        console.log(`PID ${this.pid}: ${this.state} -> ${nextState}`);
        this.state = nextState;
        this.history.push(nextState);
        return true;
    }
}

const process = new ProcessStateMachine(2001);
console.log("Simulating a normal process lifecycle:");
process.transition("READY");
process.transition("RUNNING");
process.transition("WAITING");
process.transition("READY");
process.transition("RUNNING");
process.transition("TERMINATED");

console.log("\nHistory:", process.history.join(" -> "));

console.log("\nChecking an illegal transition:");
const secondProcess = new ProcessStateMachine(2002);
secondProcess.transition("RUNNING");
console.log("Final state:", secondProcess.state);
