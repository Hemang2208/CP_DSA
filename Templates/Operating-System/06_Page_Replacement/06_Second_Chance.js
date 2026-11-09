// Topic: Second Chance Page Replacement
// Concept: FIFO with a reference bit. If the oldest page has been referenced, clear its bit
// and give it another chance by moving it to the back of the queue.
// Use: Cheap LRU approximation in hardware-assisted systems.
// Time: O(references * frames). Space: O(frames).

const references = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
const frameCount = 3;
const queue = [];
let faults = 0;
let hits = 0;

console.log("Second Chance Page Replacement");
for (const page of references) {
    const existing = queue.find((entry) => entry.page === page);

    if (existing) {
        existing.referenced = true;
        hits++;
        console.log(`Page ${page}: HIT, reference bit set, frames = [${queue.map((e) => e.page).join(", ")}]`);
        continue;
    }

    faults++;
    if (queue.length < frameCount) {
        queue.push({ page, referenced: true });
        console.log(`Page ${page}: FAULT, loaded, frames = [${queue.map((e) => e.page).join(", ")}]`);
        continue;
    }

    while (queue[0].referenced) {
        queue[0].referenced = false;
        const moved = queue.shift();
        queue.push(moved);
        console.log(`  Page ${moved.page} gets a second chance`);
    }

    const victim = queue.shift();
    queue.push({ page, referenced: true });
    console.log(`Page ${page}: FAULT, evicted ${victim.page}, frames = [${queue.map((e) => e.page).join(", ")}]`);
}

console.log(`\nPage hits: ${hits}`);
console.log(`Page faults: ${faults}`);
console.log(`Fault rate: ${((faults / references.length) * 100).toFixed(2)}%`);
