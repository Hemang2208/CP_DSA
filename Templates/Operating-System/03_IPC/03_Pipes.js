// Topic: Pipes Simulation
// Concept: A pipe is a bounded FIFO byte stream connecting a writer process to a reader.
// Reads consume data in the same order it was written.
// Use: Shell pipelines, parent-child communication, and streaming filters.
// Time: O(1) per read/write. Space: O(pipe capacity).

class Pipe {
    constructor(capacity) {
        this.capacity = capacity;
        this.buffer = [];
    }

    write(pid, value) {
        if (this.buffer.length >= this.capacity) {
            console.log(`${pid}: pipe full, write blocks`);
            return false;
        }
        this.buffer.push(value);
        console.log(`${pid} writes "${value}" -> pipe [${this.buffer.join(", ")}]`);
        return true;
    }

    read(pid) {
        if (this.buffer.length === 0) {
            console.log(`${pid}: pipe empty, read blocks`);
            return null;
        }
        const value = this.buffer.shift();
        console.log(`${pid} reads "${value}" <- pipe [${this.buffer.join(", ")}]`);
        return value;
    }
}

const pipe = new Pipe(3);
console.log("Pipe Simulation (bounded FIFO)");
pipe.write("writer", "line1");
pipe.write("writer", "line2");
pipe.write("writer", "line3");
pipe.write("writer", "line4");
pipe.read("reader");
pipe.read("reader");
pipe.write("writer", "line4");
pipe.read("reader");
pipe.read("reader");
pipe.read("reader");

console.log(`Final pipe contents: [${pipe.buffer.join(", ")}]`);
