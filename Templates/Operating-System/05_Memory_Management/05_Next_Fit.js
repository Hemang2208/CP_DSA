// Topic: Next Fit Memory Allocation
// Concept: Like first fit, but searching starts after the last allocated block and wraps
// around. This spreads allocations more evenly through memory.
// Use: Reducing repeated scans of the beginning of memory.
// Time: O(n * m). Space: O(n).

const blocks = [100, 500, 200, 300, 600];
const processes = [212, 417, 112, 426];

const memory = blocks.map((size, index) => ({ index, size, free: true, process: null }));
let pointer = 0;

console.log("Next Fit Allocation");
for (const process of processes) {
    let chosen = null;

    for (let step = 0; step < memory.length; step++) {
        const index = (pointer + step) % memory.length;
        const block = memory[index];
        if (block.free && block.size >= process) {
            chosen = block;
            pointer = (index + 1) % memory.length;
            break;
        }
    }

    if (!chosen) {
        console.log(`P${process}: no suitable block`);
        continue;
    }

    chosen.free = false;
    chosen.process = `P${process}`;
    console.log(`P${process} -> block ${chosen.index} (${chosen.size} KB), next pointer = ${pointer}`);
}

console.log("\nFinal Memory State:");
console.table(memory.map((block) => ({
    Block: block.index,
    Size: block.size,
    Status: block.free ? "FREE" : block.process
})));
