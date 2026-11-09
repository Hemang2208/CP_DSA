// Topic: File Access Methods - Sequential, Direct and Indexed
// Concept: Sequential access reads blocks in order, direct access jumps to a block number,
// and indexed access uses an index block to find data blocks quickly.
// Use: Choosing an access method based on workload (logs vs databases vs random reads).
// Time: Sequential O(k), direct O(1), indexed O(1) after index lookup. Space: O(n).

const fileBlocks = ["B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7"];
const indexBlock = [3, 0, 5, 1, 7, 2, 6, 4];

console.log("File Access Methods");
console.log(`File blocks: [${fileBlocks.join(", ")}]`);

console.log("\n1. Sequential Access");
const sequential = [];
for (let i = 0; i < 4; i++) {
    sequential.push(fileBlocks[i]);
    console.log(`Read block ${i}: ${fileBlocks[i]}`);
}
console.log(`Sequential result: [${sequential.join(", ")}]`);

console.log("\n2. Direct Access");
for (const blockNumber of [5, 2, 7]) {
    console.log(`Read block ${blockNumber} directly: ${fileBlocks[blockNumber]}`);
}

console.log("\n3. Indexed Access");
for (const logicalBlock of [0, 2, 5]) {
    const physical = indexBlock[logicalBlock];
    console.log(`Logical ${logicalBlock} -> index entry ${physical} -> ${fileBlocks[physical]}`);
}

console.log("\nSequential is best for streaming; direct and indexed are best for random access.");
