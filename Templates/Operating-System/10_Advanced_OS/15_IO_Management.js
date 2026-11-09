// Topic: I/O Management
// Concept: The OS queues I/O requests, schedules them on devices, uses buffers to smooth
// speed differences, and may use DMA to transfer data without CPU involvement.
// Use: Disk, network, and device-driver subsystems.
// Time: O(n) for n requests. Space: O(n).

class DeviceQueue {
    constructor(name) {
        this.name = name;
        this.queue = [];
        this.busy = false;
    }

    submit(pid, request) {
        this.queue.push({ pid, request });
        console.log(`${pid}: submitted ${request} to ${this.name} queue`);
        if (!this.busy) this.processNext();
    }

    processNext() {
        if (this.queue.length === 0) {
            this.busy = false;
            console.log(`${this.name}: idle`);
            return;
        }

        this.busy = true;
        const job = this.queue.shift();
        console.log(`${this.name}: processing ${job.request} for ${job.pid}`);
        console.log(`  DMA setup: device transfers data directly to memory`);
        console.log(`  Buffering: data placed in kernel buffer`);
        console.log(`  Interrupt raised when transfer completes`);
        console.log(`  ${job.pid}: I/O complete`);
        this.processNext();
    }
}

const disk = new DeviceQueue("disk");
console.log("I/O Management");
disk.submit("P1", "read block 10");
disk.submit("P2", "write block 20");
disk.submit("P3", "read block 30");
disk.submit("P4", "flush cache");

console.log("\nI/O scheduling can reorder requests to reduce seek time.");
console.log("Buffering and DMA reduce CPU overhead and hide device latency.");
