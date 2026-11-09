// Topic: Free Space Management
// Concept: Free space can be tracked with a bitmap, a linked list of free blocks, grouping,
// or counting. Each method trades memory overhead for search speed.
// Use: Allocating new blocks efficiently in a file system.
// Time: O(n) for bitmap scan, O(1) for linked-list head. Space: O(n).

const totalBlocks = 16;

console.log("Free Space Management Techniques");

console.log("\n1. Bitmap");
const bitmap = [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0];
console.log(`Bitmap: ${bitmap.join("")}`);
const firstFree = bitmap.indexOf(0);
console.log(`First free block: ${firstFree}`);

console.log("\n2. Linked List of Free Blocks");
const freeList = [2, 3, 5, 6, 8, 9, 10, 12, 13, 14, 15];
console.log(`Free list: ${freeList.join(" -> ")} -> NULL`);
console.log(`Allocate head block ${freeList[0]}; new head is ${freeList[1]}`);

console.log("\n3. Grouping");
const groups = [[2, 3, 5], [6, 8, 9], [10, 12, 13], [14, 15]];
for (let i = 0; i < groups.length; i++) {
    console.log(`Group ${i + 1}: [${groups[i].join(", ")}]`);
}
console.log("Each group stores pointers to other free groups, reducing scan time.");

console.log("\n4. Counting");
const runs = [
    { start: 2, count: 2 },
    { start: 5, count: 2 },
    { start: 8, count: 3 },
    { start: 12, count: 4 }
];
for (const run of runs) {
    console.log(`Start ${run.start}, contiguous free blocks = ${run.count}`);
}
console.log("Counting is efficient when free space has long contiguous runs.");
