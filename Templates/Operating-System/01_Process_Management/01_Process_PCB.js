// Topic: Process Control Block (PCB) Simulation
// Concept: A PCB is the kernel's record for a process. It stores PID, state,
// priority, program counter, CPU registers, memory limits, open files and CPU time.
// Use: The OS saves and restores a PCB during context switching and process control.
// Time: O(1) per operation. Space: O(1) per process.

class PCB {
    constructor(pid, name, priority, memoryLimit) {
        this.pid = pid;
        this.name = name;
        this.state = "NEW";
        this.priority = priority;
        this.programCounter = 0;
        this.registers = { ax: 0, bx: 0, cx: 0 };
        this.memoryLimit = memoryLimit;
        this.openFiles = [];
        this.cpuTime = 0;
    }

    setState(state) {
        console.log(`PID ${this.pid} state: ${this.state} -> ${state}`);
        this.state = state;
    }

    saveContext(programCounter, registers) {
        this.programCounter = programCounter;
        this.registers = { ...registers };
        console.log(`PID ${this.pid} context saved at PC=${programCounter}`);
    }

    addOpenFile(fileName) {
        this.openFiles.push(fileName);
        console.log(`PID ${this.pid} opened ${fileName}`);
    }

    runTick() {
        this.cpuTime++;
        this.programCounter++;
    }

    display() {
        console.log("\n--- PCB Snapshot ---");
        console.log(`PID          : ${this.pid}`);
        console.log(`Name         : ${this.name}`);
        console.log(`State        : ${this.state}`);
        console.log(`Priority     : ${this.priority}`);
        console.log(`Program Counter: ${this.programCounter}`);
        console.log(`Registers    : ${JSON.stringify(this.registers)}`);
        console.log(`Memory Limit : ${this.memoryLimit} KB`);
        console.log(`Open Files   : ${this.openFiles.join(", ") || "none"}`);
        console.log(`CPU Time     : ${this.cpuTime} ticks`);
    }
}

const process1 = new PCB(1001, "browser", 2, 512);
process1.display();

process1.setState("READY");
process1.setState("RUNNING");
process1.saveContext(42, { ax: 7, bx: 3, cx: 0 });
process1.addOpenFile("page.html");
process1.addOpenFile("image.png");
process1.runTick();
process1.runTick();
process1.runTick();
process1.setState("WAITING");
process1.setState("READY");
process1.setState("RUNNING");
process1.saveContext(45, { ax: 9, bx: 4, cx: 1 });
process1.setState("TERMINATED");

process1.display();
