// Topic: System Call Simulation
// Concept: A user program requests a kernel service through a trap. The CPU switches to
// kernel mode, dispatches the syscall handler, returns a result, and resumes user mode.
// Use: File I/O, process creation, memory mapping, and device access.
// Time: O(1) per syscall plus handler work. Space: O(1).

const syscallTable = {
    0: "read",
    1: "write",
    2: "open",
    3: "close",
    60: "exit"
};

function userProgram() {
    console.log("User mode: program starts");
    const calls = [
        { number: 2, args: ["notes.txt", "read"] },
        { number: 0, args: ["notes.txt", 64] },
        { number: 1, args: ["screen", "hello"] },
        { number: 3, args: ["notes.txt"] }
    ];

    for (const call of calls) {
        console.log(`User mode: preparing syscall ${call.number} (${syscallTable[call.number]})`);
        trapToKernel(call);
    }

    console.log("User mode: program ends");
}

function trapToKernel(call) {
    console.log(`  TRAP: switch to kernel mode`);
    const handler = syscallTable[call.number];

    if (!handler) {
        console.log(`  Kernel: unknown syscall ${call.number} -> EINVAL`);
        return;
    }

    console.log(`  Kernel: dispatch ${handler} with args [${call.args.join(", ")}]`);
    console.log(`  Kernel: ${handler} completed successfully`);
    console.log(`  RETURN: switch back to user mode`);
}

console.log("System Call Simulation");
userProgram();
