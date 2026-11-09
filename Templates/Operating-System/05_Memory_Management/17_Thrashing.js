// Topic: Thrashing Simulation
// Concept: Thrashing occurs when processes spend more time paging than executing because
// they do not have enough frames for their working sets.
// Use: Detecting when to reduce multiprogramming or allocate more frames.
// Time: O(references * frames). Space: O(frames).

function simulateFrames(referenceString, frameCount) {
    const frames = [];
    let faults = 0;

    for (const page of referenceString) {
        if (frames.includes(page)) continue;

        faults++;
        if (frames.length < frameCount) {
            frames.push(page);
        } else {
            frames.shift();
            frames.push(page);
        }
    }

    const faultRate = faults / referenceString.length;
    const cpuUtilization = Math.max(5, 100 - faultRate * 100);
    return { faults, faultRate, cpuUtilization };
}

const references = [0, 1, 2, 3, 0, 1, 4, 0, 1, 2, 3, 4, 0, 1, 2, 5, 0, 1, 2, 3];

console.log("Thrashing Simulation");
console.log("Reference string:", references.join(" "));
console.log("\nFrames | Faults | Fault Rate | CPU Utilization");
console.log("-------|--------|------------|----------------");

for (const frameCount of [1, 2, 3, 4, 6, 8]) {
    const result = simulateFrames(references, frameCount);
    console.log(
        `${String(frameCount).padEnd(6)} | ${String(result.faults).padEnd(6)} | ` +
        `${(result.faultRate * 100).toFixed(1).padStart(9)}% | ` +
        `${result.cpuUtilization.toFixed(1).padStart(14)}%`
    );
}

console.log("\nWith too few frames, the fault rate is high and CPU utilization collapses.");
console.log("Adding frames improves the working-set hit rate and reduces thrashing.");
