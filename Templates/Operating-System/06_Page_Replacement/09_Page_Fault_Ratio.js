// Topic: Page Fault Ratio
// Concept: Page-fault ratio = page faults / total references. Hit ratio is its complement.
// Use: Comparing memory pressure and replacement policies.
// Time: O(references * frames). Space: O(frames).

const references = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
const frameCount = 3;
const frames = [];
let faults = 0;

for (const page of references) {
    if (frames.includes(page)) continue;

    faults++;
    if (frames.length === frameCount) frames.shift();
    frames.push(page);
}

const total = references.length;
const faultRatio = faults / total;
const hitRatio = 1 - faultRatio;

console.log("Page Fault Ratio (FIFO)");
console.log(`Total references : ${total}`);
console.log(`Page faults      : ${faults}`);
console.log(`Page hits        : ${total - faults}`);
console.log(`Page fault ratio : ${(faultRatio * 100).toFixed(2)}%`);
console.log(`Page hit ratio   : ${(hitRatio * 100).toFixed(2)}%`);
