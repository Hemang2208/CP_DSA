// Topic: FIFO Page Replacement
// Concept: The oldest loaded page is evicted when a new page needs a frame.
// Use: Simple page replacement; suffers from Belady's anomaly.
// Time: O(references * frames). Space: O(frames).

const references = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
const frameCount = 3;
const frames = [];
let faults = 0;
let hits = 0;

console.log("FIFO Page Replacement");
for (const page of references) {
    if (frames.includes(page)) {
        hits++;
        console.log(`Page ${page}: HIT, frames = [${frames.join(", ")}]`);
        continue;
    }

    faults++;
    if (frames.length < frameCount) {
        frames.push(page);
        console.log(`Page ${page}: FAULT, loaded, frames = [${frames.join(", ")}]`);
    } else {
        const victim = frames.shift();
        frames.push(page);
        console.log(`Page ${page}: FAULT, evicted ${victim}, frames = [${frames.join(", ")}]`);
    }
}

console.log(`\nPage hits: ${hits}`);
console.log(`Page faults: ${faults}`);
console.log(`Fault rate: ${((faults / references.length) * 100).toFixed(2)}%`);
