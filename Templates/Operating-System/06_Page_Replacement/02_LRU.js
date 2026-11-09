// Topic: LRU Page Replacement
// Concept: Evict the page that has not been used for the longest time. It approximates
// future behavior using recent history.
// Use: General-purpose virtual memory with temporal locality.
// Time: O(references * frames). Space: O(frames).

const references = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
const frameCount = 3;
const frames = [];
const lastUsed = new Map();
let faults = 0;
let hits = 0;

console.log("LRU Page Replacement");
for (let time = 0; time < references.length; time++) {
    const page = references[time];

    if (frames.includes(page)) {
        hits++;
        lastUsed.set(page, time);
        console.log(`Page ${page}: HIT, frames = [${frames.join(", ")}]`);
        continue;
    }

    faults++;
    if (frames.length < frameCount) {
        frames.push(page);
        lastUsed.set(page, time);
        console.log(`Page ${page}: FAULT, loaded, frames = [${frames.join(", ")}]`);
        continue;
    }

    let victim = frames[0];
    for (const candidate of frames) {
        if (lastUsed.get(candidate) < lastUsed.get(victim)) {
            victim = candidate;
        }
    }

    const index = frames.indexOf(victim);
    frames[index] = page;
    lastUsed.delete(victim);
    lastUsed.set(page, time);
    console.log(`Page ${page}: FAULT, evicted LRU page ${victim}, frames = [${frames.join(", ")}]`);
}

console.log(`\nPage hits: ${hits}`);
console.log(`Page faults: ${faults}`);
console.log(`Fault rate: ${((faults / references.length) * 100).toFixed(2)}%`);
