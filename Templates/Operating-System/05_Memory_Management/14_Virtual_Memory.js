// Topic: Virtual Memory
// Concept: Virtual memory lets a process use more logical address space than physical RAM.
// Pages are loaded from disk only when needed, and the page table tracks which pages are resident.
// Use: Running large programs with limited physical memory.
// Time: O(1) per access, O(frames) for replacement. Space: O(pages) page table.

const totalPages = 8;
const frameCount = 3;
const pageTable = Array.from({ length: totalPages }, (_, page) => ({
    page,
    frame: null,
    valid: false
}));
const frames = new Array(frameCount).fill(null);
const fifoQueue = [];
const references = [0, 1, 2, 0, 3, 1, 4, 2, 0, 3];

function accessPage(page) {
    const entry = pageTable[page];

    if (entry.valid) {
        console.log(`Page ${page}: HIT, frame ${entry.frame}`);
        return true;
    }

    console.log(`Page ${page}: PAGE FAULT, loading from disk`);
    let frameNumber = frames.indexOf(null);

    if (frameNumber === -1) {
        const victim = fifoQueue.shift();
        frameNumber = pageTable[victim].frame;
        pageTable[victim].valid = false;
        pageTable[victim].frame = null;
        console.log(`  Evicting page ${victim} from frame ${frameNumber}`);
    }

    frames[frameNumber] = page;
    fifoQueue.push(page);
    entry.valid = true;
    entry.frame = frameNumber;
    console.log(`  Page ${page} loaded into frame ${frameNumber}`);
    return false;
}

console.log("Virtual Memory Simulation");
let faults = 0;
for (const page of references) {
    if (!accessPage(page)) faults++;
}

console.log(`\nReferences: ${references.length}`);
console.log(`Page faults: ${faults}`);
console.log(`Resident pages: [${frames.join(", ")}]`);
console.log(`Physical frames: ${frameCount}, virtual pages: ${totalPages}`);
