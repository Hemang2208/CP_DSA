// Topic: External Fragmentation
// Concept: Total free memory may be sufficient, but it is split into non-contiguous holes,
// so a large contiguous request cannot be satisfied.
// Use: Motivates compaction, paging, and segmentation.
// Time: O(n). Space: O(n).

const freeBlocks = [50, 100, 30, 80, 40];
const request = 200;

const totalFree = freeBlocks.reduce((sum, size) => sum + size, 0);
const largestFree = Math.max(...freeBlocks);

console.log("External Fragmentation");
console.log(`Free blocks: [${freeBlocks.join(", ")}] KB`);
console.log(`Total free memory: ${totalFree} KB`);
console.log(`Largest contiguous free block: ${largestFree} KB`);
console.log(`Request: ${request} KB`);

if (totalFree >= request && largestFree < request) {
    console.log("\nAllocation FAILS due to external fragmentation.");
    console.log("Enough total memory exists, but no single hole is large enough.");
} else {
    console.log("\nAllocation may succeed.");
}

console.log("\nPossible fixes:");
console.log("- Compact free blocks into one region.");
console.log("- Use paging to allow non-contiguous allocation.");
console.log("- Use segmentation with variable-sized segments.");
