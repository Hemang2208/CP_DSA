// Topic: Optimal (OPT) Page Replacement
// Concept: Evict the page whose next use is farthest in the future. It gives the minimum
// possible number of page faults but requires future knowledge.
// Use: A theoretical benchmark for evaluating practical algorithms.
// Time: O(references^2 * frames). Space: O(frames).

const references = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
const frameCount = 3;
const frames = [];
let faults = 0;
let hits = 0;

function nextUse(page, from) {
    for (let i = from; i < references.length; i++) {
        if (references[i] === page) return i;
    }
    return Infinity;
}

console.log("Optimal Page Replacement");
for (let time = 0; time < references.length; time++) {
    const page = references[time];

    if (frames.includes(page)) {
        hits++;
        console.log(`Page ${page}: HIT, frames = [${frames.join(", ")}]`);
        continue;
    }

    faults++;
    if (frames.length < frameCount) {
        frames.push(page);
        console.log(`Page ${page}: FAULT, loaded, frames = [${frames.join(", ")}]`);
        continue;
    }

    let victim = frames[0];
    let farthest = nextUse(victim, time + 1);

    for (const candidate of frames) {
        const use = nextUse(candidate, time + 1);
        if (use > farthest) {
            farthest = use;
            victim = candidate;
        }
    }

    const index = frames.indexOf(victim);
    frames[index] = page;
    console.log(`Page ${page}: FAULT, evicted ${victim} (next use ${farthest === Infinity ? "never" : farthest}), frames = [${frames.join(", ")}]`);
}

console.log(`\nPage hits: ${hits}`);
console.log(`Page faults: ${faults}`);
console.log(`Fault rate: ${((faults / references.length) * 100).toFixed(2)}%`);
