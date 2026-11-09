// Topic: Context Switching Simulation
// Concept: A context switch saves the running process's registers and program counter,
// then restores another process's saved context. The switch itself consumes CPU time.
// Use: Multitasking kernels and interrupt-driven preemption.
// Time: O(1) per switch. Space: O(1) per process context.

const switchOverhead = 2;

class CPU {
    constructor() {
        this.current = null;
        this.registers = { pc: 0, acc: 0 };
        this.switches = 0;
        this.overheadTime = 0;
    }

    save(process) {
        process.savedContext = { ...this.registers };
        console.log(`Saved ${process.pid}: PC=${process.savedContext.pc}, ACC=${process.savedContext.acc}`);
    }

    restore(process) {
        this.registers = { ...process.savedContext };
        this.current = process;
        console.log(`Restored ${process.pid}: PC=${this.registers.pc}, ACC=${this.registers.acc}`);
    }

    switchTo(process) {
        console.log(`\nContext switch requested: ${this.current ? this.current.pid : "none"} -> ${process.pid}`);
        if (this.current) this.save(this.current);
        this.switches++;
        this.overheadTime += switchOverhead;
        console.log(`Switch overhead: ${switchOverhead} units (total ${this.overheadTime})`);
        this.restore(process);
    }

    execute(units) {
        this.registers.pc += units;
        this.registers.acc += units * 2;
        console.log(`${this.current.pid} executed ${units} units -> PC=${this.registers.pc}, ACC=${this.registers.acc}`);
    }
}

const p1 = { pid: "P1", savedContext: { pc: 0, acc: 0 } };
const p2 = { pid: "P2", savedContext: { pc: 100, acc: 50 } };
const cpu = new CPU();

cpu.switchTo(p1);
cpu.execute(3);
cpu.switchTo(p2);
cpu.execute(2);
cpu.switchTo(p1);
cpu.execute(4);

console.log(`\nTotal context switches: ${cpu.switches}`);
console.log(`Total switching overhead: ${cpu.overheadTime} units`);
console.log(`Final running process: ${cpu.current.pid}`);
