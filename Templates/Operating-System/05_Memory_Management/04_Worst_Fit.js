// Topic: Worst Fit Memory Allocation
// Concept: Allocate the largest free block. The leftover part is as large as possible,
// which may remain useful for another process.
// Use: Workloads where large free chunks should stay available.
// Time: O(n * m). Space: O(n).

const blocks = [100, 500, 200, 300, 600];
const processes = [212, 417, 112, 426];

const memory = blocks.map((size, index) => ({ index, size, free: true, process: null }));

console.log("Worst Fit Allocation");
for (const process of processes) {
    const candidates = memory.filter((item) => item.free && item.size >= process);

    if (candidates.length === 0) {
        console.log(`P${process}: no suitable block`);
        continue;
    }

    candidates.sort((a, b) => b.size - a.size);
    const block = candidates[0];
    block.free = false;
    block.process = `P${process}`;
    console.log(`P${process} -> block ${block.index} (${block.size} KB, waste ${block.size - process} KB)`);
}

console.log("\nFinal Memory State:");
console.table(memory.map((block) => ({
    Block: block.index,
    Size: block.size,
    Status: block.free ? "FREE" : block.process
})));
