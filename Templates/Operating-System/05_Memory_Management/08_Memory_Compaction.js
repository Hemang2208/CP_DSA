// Topic: Memory Compaction
// Concept: Compaction moves allocated blocks together so free memory forms one large
// contiguous region. It removes external fragmentation but costs CPU time.
// Use: Contiguous allocators after many allocations and frees.
// Time: O(n) to compact n blocks. Space: O(n) for the new layout.

const memory = [
    { process: "P1", size: 100 },
    { process: null, size: 50 },
    { process: "P2", size: 200 },
    { process: null, size: 80 },
    { process: "P3", size: 150 },
    { process: null, size: 120 }
];

function display(label) {
    console.log(label);
    console.log(memory.map((block) => `${block.process || "FREE"}(${block.size})`).join(" | "));
}

display("Before Compaction:");
const used = memory.filter((block) => block.process !== null);
const free = memory.filter((block) => block.process === null);
const totalFree = free.reduce((sum, block) => sum + block.size, 0);

const compacted = [
    ...used,
    { process: null, size: totalFree }
];

console.log("\nMoving allocated blocks together...");
console.log("After Compaction:");
console.log(compacted.map((block) => `${block.process || "FREE"}(${block.size})`).join(" | "));

const largestHole = Math.max(...compacted.filter((b) => b.process === null).map((b) => b.size));
console.log(`\nLargest contiguous free block after compaction: ${largestHole} KB`);
console.log(`Total free memory: ${totalFree} KB`);
