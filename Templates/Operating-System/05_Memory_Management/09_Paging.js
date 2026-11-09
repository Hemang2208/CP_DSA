// Topic: Paging Technique
// Concept: Logical memory is divided into fixed-size pages and physical memory into frames.
// Any page can be placed in any free frame, eliminating external fragmentation.
// Use: Modern virtual-memory systems.
// Time: O(1) per address translation. Space: O(number of pages) for the page table.

const pageSize = 1024;
const pageTable = { 0: 5, 1: 2, 2: 8, 3: 1, 4: 7 };
const logicalAddresses = [0, 1024, 2500, 4096, 5000];

console.log(`Paging with page size = ${pageSize} bytes`);
console.log("Page -> Frame mapping:", pageTable);

for (const address of logicalAddresses) {
    const pageNumber = Math.floor(address / pageSize);
    const offset = address % pageSize;
    const frameNumber = pageTable[pageNumber];

    if (frameNumber === undefined) {
        console.log(`Logical ${address}: page ${pageNumber} not mapped -> page fault`);
        continue;
    }

    const physicalAddress = frameNumber * pageSize + offset;
    console.log(`Logical ${address} -> page ${pageNumber}, offset ${offset} -> frame ${frameNumber} -> physical ${physicalAddress}`);
}

console.log("\nPages are contiguous logically but may be scattered physically.");
