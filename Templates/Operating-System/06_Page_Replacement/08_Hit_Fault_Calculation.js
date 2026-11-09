// Topic: Page Hit and Page Fault Calculation
// Concept: A page hit occurs when the requested page is already in a frame; otherwise it is
// a page fault. Counting both gives a simple measure of memory performance.
// Use: Evaluating page-replacement and working-set behavior.
// Time: O(references * frames). Space: O(frames).

const references = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];
const frameCount = 3;
const frames = [];
let hits = 0;
let faults = 0;

console.log("Page Hit and Fault Calculation (FIFO)");
for (const page of references) {
    if (frames.includes(page)) {
        hits++;
        console.log(`Reference ${page}: HIT (frames: [${frames.join(", ")}])`);
    } else {
        faults++;
        if (frames.length === frameCount) frames.shift();
        frames.push(page);
        console.log(`Reference ${page}: FAULT (frames: [${frames.join(", ")}])`);
    }
}

console.log(`\nTotal references: ${references.length}`);
console.log(`Page hits: ${hits}`);
console.log(`Page faults: ${faults}`);
console.log(`Check: hits + faults = ${hits + faults}`);
