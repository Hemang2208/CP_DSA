// Topic: File Allocation - Linked
// Concept: Each file is a linked list of disk blocks. The directory stores the first block,
// and every block stores a pointer to the next block.
// Use: Avoiding external fragmentation, at the cost of random-access overhead.
// Time: O(1) to allocate a block, O(n) to traverse a file. Space: O(diskSize).

const diskSize = 20;
const freeBlocks = Array.from({ length: diskSize }, (_, i) => i);
const files = [
    { name: "a.txt", blocks: 3 },
    { name: "b.bin", blocks: 5 },
    { name: "c.log", blocks: 2 }
];

console.log("Linked File Allocation");
const directory = [];

for (const file of files) {
    if (freeBlocks.length < file.blocks) {
        console.log(`${file.name}: not enough free blocks`);
        continue;
    }

    const chain = [];
    for (let i = 0; i < file.blocks; i++) {
        chain.push(freeBlocks.shift());
    }

    directory.push({ name: file.name, firstBlock: chain[0], chain });
    console.log(`${file.name}: chain ${chain.join(" -> ")}`);
}

console.log("\nDirectory:");
console.table(directory.map((entry) => ({
    Name: entry.name,
    FirstBlock: entry.firstBlock,
    Chain: entry.chain.join(" -> ")
})));

for (const entry of directory) {
    console.log(`Traversing ${entry.name}: ${entry.chain.join(" -> ")} -> NULL`);
}

console.log(`Free blocks remaining: [${freeBlocks.join(", ")}]`);
