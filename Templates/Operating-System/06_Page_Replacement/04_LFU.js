// Topic: LFU Page Replacement
// Concept: Evict the page with the smallest reference count. Ties are broken by least
// recently used order.
// Use: Workloads where frequently used pages should stay resident.
// Time: O(references * frames). Space: O(frames).

const references = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
const frameCount = 3;
const frames = [];
const frequency = new Map();
const lastUsed = new Map();
let faults = 0;
let hits = 0;

console.log("LFU Page Replacement");
for (let time = 0; time < references.length; time++) {
    const page = references[time];

    if (frames.includes(page)) {
        hits++;
        frequency.set(page, frequency.get(page) + 1);
        lastUsed.set(page, time);
        console.log(`Page ${page}: HIT, freq=${frequency.get(page)}, frames = [${frames.join(", ")}]`);
        continue;
    }

    faults++;
    if (frames.length < frameCount) {
        frames.push(page);
        frequency.set(page, 1);
        lastUsed.set(page, time);
        console.log(`Page ${page}: FAULT, loaded, frames = [${frames.join(", ")}]`);
        continue;
    }

    let victim = frames[0];
    for (const candidate of frames) {
        const lowerFrequency = frequency.get(candidate) < frequency.get(victim);
        const sameFrequency = frequency.get(candidate) === frequency.get(victim);
        if (lowerFrequency || (sameFrequency && lastUsed.get(candidate) < lastUsed.get(victim))) {
            victim = candidate;
        }
    }

    const index = frames.indexOf(victim);
    frames[index] = page;
    frequency.delete(victim);
    lastUsed.delete(victim);
    frequency.set(page, 1);
    lastUsed.set(page, time);
    console.log(`Page ${page}: FAULT, evicted LFU page ${victim}, frames = [${frames.join(", ")}]`);
}

console.log(`\nPage hits: ${hits}`);
console.log(`Page faults: ${faults}`);
console.log(`Fault rate: ${((faults / references.length) * 100).toFixed(2)}%`);
