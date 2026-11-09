// Topic: Virtual Memory Management
// Concept: Each process has its own page table mapping virtual pages to physical frames.
// Pages not resident in RAM are loaded from disk on demand.
// Use: Isolation and memory overcommit in modern operating systems.
// Time: O(frames) per page fault. Space: O(pages + frames).

class VirtualMemoryManager {
    constructor(frameCount) {
        this.frames = new Array(frameCount).fill(null);
        this.processes = new Map();
    }

    createProcess(pid, pageCount) {
        const pageTable = Array.from({ length: pageCount }, (_, page) => ({
            page,
            frame: null,
            valid: false
        }));
        this.processes.set(pid, pageTable);
        console.log(`Process ${pid} created with ${pageCount} virtual pages`);
    }

    access(pid, page) {
        const table = this.processes.get(pid);
        if (!table) {
            console.log(`Process ${pid} not found`);
            return;
        }

        const entry = table[page];
        if (entry.valid) {
            console.log(`${pid} page ${page}: HIT in frame ${entry.frame}`);
            return;
        }

        console.log(`${pid} page ${page}: PAGE FAULT, loading from disk`);
        let frame = this.frames.indexOf(null);

        if (frame === -1) {
            const victim = this.frames.findIndex((value) => value !== null);
            const victimProcess = this.frames[victim].pid;
            const victimPage = this.frames[victim].page;
            this.processes.get(victimProcess)[victimPage].valid = false;
            this.processes.get(victimProcess)[victimPage].frame = null;
            console.log(`  Evicting ${victimProcess} page ${victimPage} from frame ${victim}`);
            frame = victim;
        }

        this.frames[frame] = { pid, page };
        entry.valid = true;
        entry.frame = frame;
        console.log(`  Loaded ${pid} page ${page} into frame ${frame}`);
    }

    display() {
        console.log("\nFrame table:");
        console.table(this.frames.map((entry, index) => ({
            Frame: index,
            Owner: entry ? entry.pid : "FREE",
            Page: entry ? entry.page : "-"
        })));
    }
}

const vmm = new VirtualMemoryManager(4);
console.log("Virtual Memory Management");
vmm.createProcess("P1", 4);
vmm.createProcess("P2", 3);
vmm.access("P1", 0);
vmm.access("P1", 1);
vmm.access("P2", 0);
vmm.access("P1", 2);
vmm.access("P2", 1);
vmm.access("P1", 0);
vmm.display();
