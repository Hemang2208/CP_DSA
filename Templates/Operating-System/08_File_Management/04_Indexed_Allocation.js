// Topic: File Allocation - Indexed
// Concept: Each file has an index block containing pointers to its data blocks.
// The directory stores the index block number, enabling direct access to any block.
// Use: File systems that need fast random access without contiguous allocation.
// Time: O(1) to locate a block via the index. Space: O(diskSize + index blocks).

const diskSize = 24;
const freeBlocks = Array.from({ length: diskSize }, (_, i) => i);
const files = [
    { name: "a.txt", blocks: 4 },
    { name: "b.bin", blocks: 6 },
    { name: "c.log", blocks: 3 }
];

console.log("Indexed File Allocation");
const directory = [];

for (const file of files) {
    if (freeBlocks.length < file.blocks + 1) {
        console.log(`${file.name}: not enough blocks for data + index`);
        continue;
    }

    const indexBlock = freeBlocks.shift();
    const dataBlocks = [];
    for (let i = 0; i < file.blocks; i++) {
        dataBlocks.push(freeBlocks.shift());
    }

    directory.push({ name: file.name, indexBlock, dataBlocks });
    console.log(`${file.name}: index block ${indexBlock} -> data [${dataBlocks.join(", ")}]`);
}

console.log("\nDirectory:");
console.table(directory.map((entry) => ({
    Name: entry.name,
    IndexBlock: entry.indexBlock,
    DataBlocks: entry.dataBlocks.join(", ")
})));

for (const entry of directory) {
    console.log(`Direct access to ${entry.name} block 2 -> data block ${entry.dataBlocks[2]}`);
}

console.log(`Free blocks remaining: [${freeBlocks.join(", ")}]`);
