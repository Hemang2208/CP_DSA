// Topic: Demand Paging and Page Fault Handling
// Concept: Pages are loaded only when referenced. A fault traps to the OS, which finds a
// frame, loads the page from disk, updates the page table, and restarts the instruction.
// Use: Lazy loading and efficient use of physical memory.
// Time: O(references * frames). Space: O(frames).

const references = [0, 1, 2, 0, 3, 0, 4, 2, 3, 0];
const frameCount = 3;
const frames = new Array(frameCount).fill(null);
const fifo = [];
let faults = 0;

function handleFault(page) {
    console.log(`  Trap: page ${page} is not resident`);
    let frame = frames.indexOf(null);

    if (frame === -1) {
        const victim = fifo.shift();
        frame = frames.indexOf(victim);
        console.log(`  Evicting page ${victim} from frame ${frame}`);
    }

    frames[frame] = page;
    fifo.push(page);
    console.log(`  Loaded page ${page} into frame ${frame}`);
    console.log(`  Page table updated and instruction restarted`);
}

console.log("Demand Paging and Page Fault Handling");
for (const page of references) {
    if (frames.includes(page)) {
        console.log(`Reference ${page}: HIT`);
        continue;
    }

    faults++;
    console.log(`Reference ${page}: FAULT`);
    handleFault(page);
    console.log(`  Frames: [${frames.map((frame) => (frame === null ? "-" : frame)).join(", ")}]`);
}

console.log(`\nTotal references: ${references.length}`);
console.log(`Page faults: ${faults}`);
console.log(`Fault rate: ${((faults / references.length) * 100).toFixed(2)}%`);
