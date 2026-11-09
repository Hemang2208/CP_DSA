// Topic: Clock Page Replacement
// Concept: Frames are arranged in a circle with reference bits. The clock hand clears
// referenced bits until it finds a page with bit 0 to evict.
// Use: Efficient second-chance approximation without moving queue entries.
// Time: O(references * frames). Space: O(frames).

const references = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
const frameCount = 3;
const frames = [];
let hand = 0;
let faults = 0;
let hits = 0;

console.log("Clock Page Replacement");
for (const page of references) {
    const existing = frames.find((entry) => entry.page === page);

    if (existing) {
        existing.referenced = true;
        hits++;
        console.log(`Page ${page}: HIT, reference bit set, frames = [${frames.map((e) => e.page).join(", ")}]`);
        continue;
    }

    faults++;
    if (frames.length < frameCount) {
        frames.push({ page, referenced: true });
        console.log(`Page ${page}: FAULT, loaded, frames = [${frames.map((e) => e.page).join(", ")}]`);
        continue;
    }

    while (frames[hand].referenced) {
        frames[hand].referenced = false;
        console.log(`  Page ${frames[hand].page} reference bit cleared`);
        hand = (hand + 1) % frameCount;
    }

    const victim = frames[hand];
    frames[hand] = { page, referenced: true };
    hand = (hand + 1) % frameCount;
    console.log(`Page ${page}: FAULT, evicted ${victim.page}, frames = [${frames.map((e) => e.page).join(", ")}]`);
}

console.log(`\nPage hits: ${hits}`);
console.log(`Page faults: ${faults}`);
console.log(`Fault rate: ${((faults / references.length) * 100).toFixed(2)}%`);
