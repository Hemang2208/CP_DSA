// Topic: Belady's Anomaly Demonstration
// Concept: For FIFO, increasing the number of frames can sometimes increase page faults.
// This counter-intuitive result is called Belady's anomaly.
// Use: Shows why FIFO is not always a good page-replacement policy.
// Time: O(references * frames). Space: O(frames).

const references = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];

function fifoFaults(references, frameCount) {
    const frames = [];
    let faults = 0;

    for (const page of references) {
        if (frames.includes(page)) continue;

        faults++;
        if (frames.length === frameCount) frames.shift();
        frames.push(page);
    }

    return faults;
}

console.log("Belady's Anomaly with FIFO");
console.log("Reference string:", references.join(" "));
console.log("Frames | Page Faults");
console.log("-------|------------");

for (const frames of [3, 4, 5]) {
    console.log(`${String(frames).padEnd(6)} | ${fifoFaults(references, frames)}`);
}

const threeFrames = fifoFaults(references, 3);
const fourFrames = fifoFaults(references, 4);
console.log(`\nFaults with 3 frames: ${threeFrames}`);
console.log(`Faults with 4 frames: ${fourFrames}`);
console.log(`Anomaly observed: ${fourFrames > threeFrames}`);
console.log("LRU and Optimal do not suffer from Belady's anomaly.");
