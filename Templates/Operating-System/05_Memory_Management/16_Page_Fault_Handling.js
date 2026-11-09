// Topic: Page Fault Handling
// Concept: A page fault traps to the OS. The OS finds a free frame or victim, writes back
// a dirty victim, reads the requested page from disk, updates the page table, and restarts.
// Use: Demand-paged virtual memory.
// Time: O(1) plus disk I/O time. Space: O(frames + page table).

class PageFaultHandler {
    constructor() {
        this.pageTable = [
            { page: 0, frame: 2, valid: true, dirty: false },
            { page: 1, frame: null, valid: false, dirty: false },
            { page: 2, frame: 5, valid: true, dirty: true },
            { page: 3, frame: null, valid: false, dirty: false }
        ];
        this.freeFrames = [7];
        this.diskPage = 1;
    }

    handle(page) {
        console.log(`\nCPU accesses page ${page}`);
        const entry = this.pageTable[page];

        if (entry.valid) {
            console.log(`Page ${page} is resident in frame ${entry.frame}; no fault.`);
            return;
        }

        console.log("1. Page fault trap: valid bit is 0");
        console.log("2. OS saves the faulting instruction state");

        let frame;
        if (this.freeFrames.length > 0) {
            frame = this.freeFrames.shift();
            console.log(`3. Using free frame ${frame}`);
        } else {
            const victim = this.pageTable.find((item) => item.valid);
            frame = victim.frame;
            console.log(`3. Evicting page ${victim.page} from frame ${frame}`);
            if (victim.dirty) {
                console.log(`4. Victim is dirty, writing page ${victim.page} back to disk`);
            }
            victim.valid = false;
            victim.frame = null;
            victim.dirty = false;
        }

        console.log(`5. Reading page ${page} from disk`);
        entry.frame = frame;
        entry.valid = true;
        entry.dirty = false;
        console.log(`6. Page table updated: page ${page} -> frame ${frame}`);
        console.log("7. Restarting the faulting instruction");
    }
}

const handler = new PageFaultHandler();
handler.handle(0);
handler.handle(1);
handler.handle(3);
console.log(`\nFinal page table:`);
console.table(handler.pageTable);
