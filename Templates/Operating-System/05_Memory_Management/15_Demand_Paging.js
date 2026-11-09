// Topic: Demand Paging
// Concept: Pages are brought into memory only when referenced. A reference to a non-resident
// page causes a page fault and the page is loaded from disk.
// Use: Lazy loading in virtual-memory systems.
// Time: O(references * frames) with FIFO replacement. Space: O(frames).

const references = [0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2];
const frameCount = 3;
const frames = [];
let faults = 0;

console.log("Demand Paging (FIFO replacement)");
for (const page of references) {
    if (frames.includes(page)) {
        console.log(`Reference ${page}: HIT, frames = [${frames.join(", ")}]`);
        continue;
    }

    faults++;
    if (frames.length < frameCount) {
        frames.push(page);
        console.log(`Reference ${page}: FAULT, loaded, frames = [${frames.join(", ")}]`);
    } else {
        const victim = frames.shift();
        frames.push(page);
        console.log(`Reference ${page}: FAULT, evicted ${victim}, frames = [${frames.join(", ")}]`);
    }
}

console.log(`\nTotal references: ${references.length}`);
console.log(`Page faults: ${faults}`);
console.log(`Page hits: ${references.length - faults}`);
console.log(`Fault rate: ${((faults / references.length) * 100).toFixed(2)}%`);
