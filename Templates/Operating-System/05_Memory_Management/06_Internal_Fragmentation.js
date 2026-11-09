// Topic: Internal Fragmentation
// Concept: A fixed-size block may be larger than the requested memory. The unused space
// inside the allocated block is internal fragmentation.
// Use: Understanding waste in paging and fixed-partition allocation.
// Time: O(n). Space: O(n).

const allocations = [
    { process: "P1", requested: 210, blockSize: 256 },
    { process: "P2", requested: 90, blockSize: 128 },
    { process: "P3", requested: 400, blockSize: 512 },
    { process: "P4", requested: 30, blockSize: 64 }
];

console.log("Internal Fragmentation");
let totalWaste = 0;

for (const item of allocations) {
    const waste = item.blockSize - item.requested;
    totalWaste += waste;
    console.log(`${item.process}: requested ${item.requested} KB, allocated ${item.blockSize} KB, waste ${waste} KB`);
}

console.log(`\nTotal internal fragmentation: ${totalWaste} KB`);
console.log("This space is inside allocated blocks and cannot be used by other processes.");
