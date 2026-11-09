// Topic: Interrupt Handling Simulation
// Concept: A device raises an interrupt, the CPU saves its state, looks up the ISR in the
// interrupt vector table, runs the handler, and restores the interrupted context.
// Use: Responsive I/O, timers, and preemptive multitasking.
// Time: O(1) per interrupt plus ISR work. Space: O(stack depth).

const vectorTable = {
    0: "timer",
    1: "keyboard",
    2: "disk",
    3: "network"
};

class CPU {
    constructor() {
        this.mode = "user";
        this.pc = 100;
        this.interruptsEnabled = true;
        this.stack = [];
    }

    raiseInterrupt(number, priority) {
        const name = vectorTable[number];
        console.log(`\nInterrupt ${number} (${name}, priority ${priority}) raised`);

        if (!this.interruptsEnabled) {
            console.log("Interrupts disabled: request is pending");
            return;
        }

        this.stack.push({ pc: this.pc, mode: this.mode });
        this.mode = "kernel";
        console.log(`Saved context: PC=${this.pc}, mode=user`);
        console.log(`Dispatch ISR: ${name}`);
        this.runISR(name, priority);
        const saved = this.stack.pop();
        this.pc = saved.pc;
        this.mode = saved.mode;
        console.log(`Restored context: PC=${this.pc}, mode=${this.mode}`);
    }

    runISR(name, priority) {
        if (name === "timer") {
            console.log("  ISR: update tick counter and check preemption");
        } else if (name === "keyboard") {
            console.log("  ISR: read scancode into keyboard buffer");
        } else if (name === "disk") {
            console.log("  ISR: acknowledge DMA completion");
        } else {
            console.log("  ISR: move packet to network stack");
        }
    }
}

const cpu = new CPU();
console.log("Interrupt Handling Simulation");
cpu.raiseInterrupt(1, 2);
cpu.raiseInterrupt(0, 1);
cpu.interruptsEnabled = false;
cpu.raiseInterrupt(2, 3);
cpu.interruptsEnabled = true;
cpu.raiseInterrupt(3, 2);
