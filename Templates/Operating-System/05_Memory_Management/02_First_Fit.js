// Topic: First Fit Memory Allocation
// Concept: Allocate the first free block that is large enough. It is fast but may leave
// small unusable holes near the beginning of memory.
// Use: Simple contiguous memory allocators.
// Time: O(n * m) for n blocks and m processes. Space: O(n).

const blocks = [100, 500, 200, 300, 600];
const processes = [212, 417, 112, 426];

const memory = blocks.map((size, index) => ({ index, size, free: true, process: null }));

console.log("First Fit Allocation");
for (const process of processes) {
    const block = memory.find((item) => item.free && item.size >= process);

    if (!block) {
        console.log(`P${process}: no suitable block`);
        continue;
    }

    block.free = false;
    block.process = `P${process}`;
    console.log(`P${process} -> block ${block.index} (${block.size} KB)`);
}

console.log("\nFinal Memory State:");
console.table(memory.map((block) => ({
    Block: block.index,
    Size: block.size,
    Status: block.free ? "FREE" : block.process
})));

const totalFree = memory.filter((b) => b.free).reduce((sum, b) => sum + b.size, 0);
console.log(`Total free memory: ${totalFree} KB`);
