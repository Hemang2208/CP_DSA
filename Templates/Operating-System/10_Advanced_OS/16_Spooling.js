// Topic: Spooling Simulation
// Concept: Spooling stores output jobs in a queue on disk so a slow device can process them
// later. It decouples job submission from device execution.
// Use: Print spoolers and batch I/O systems.
// Time: O(n) for n jobs. Space: O(n).

class Spooler {
    constructor(printerName) {
        this.printerName = printerName;
        this.queue = [];
        this.printed = [];
    }

    submit(user, document) {
        const job = { id: this.queue.length + this.printed.length + 1, user, document };
        this.queue.push(job);
        console.log(`${user}: submitted "${document}" as job ${job.id}`);
    }

    printNext() {
        if (this.queue.length === 0) {
            console.log(`${this.printerName}: no jobs in spool`);
            return;
        }

        const job = this.queue.shift();
        console.log(`${this.printerName}: printing job ${job.id} "${job.document}" for ${job.user}`);
        this.printed.push(job);
        console.log(`  Job ${job.id} completed`);
    }

    status() {
        console.log(`\nSpool queue: ${this.queue.map((job) => job.id).join(", ") || "empty"}`);
        console.log(`Printed jobs: ${this.printed.map((job) => job.id).join(", ") || "none"}`);
    }
}

const spooler = new Spooler("LaserPrinter");
console.log("Spooling Simulation");
spooler.submit("alice", "report.pdf");
spooler.submit("bob", "notes.txt");
spooler.submit("charlie", "poster.png");
spooler.status();
spooler.printNext();
spooler.printNext();
spooler.status();
spooler.printNext();
spooler.printNext();
spooler.status();
